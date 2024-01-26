import tensorflow as tf
from keras.applications.resnet import ResNet50, preprocess_input
from keras.layers import GlobalMaxPooling2D
import cv2
import numpy as np
from numpy.linalg import norm
import pickle
from sklearn.neighbors import NearestNeighbors
from PIL import Image
import os
from flask import Flask, jsonify, request;
from flask_cors import CORS
import json
from datetime import datetime
import re



def extract_feature(img_path, model):
    im=cv2.imread(img_path)
    im=cv2.resize(im, (224, 224))
    im=np.array(im)
    expand_img=np.expand_dims(im, axis=0)
    preprocessed_img=preprocess_input(expand_img)
    result=model.predict(preprocessed_img).flatten()
    normalized=result/norm(result)
    return normalized


def get_similar_products(image_path):
    features_list=np.array(pickle.load(open('features_vector.pkl', 'rb')))
    files_name=pickle.load(open('file_names.pkl', 'rb'))

    model=ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    model.trainable=False

    model=tf.keras.Sequential([
        model,
        GlobalMaxPooling2D()
    ])
    model.summary()

    neighbors=NearestNeighbors(n_neighbors=10, algorithm='brute', metric='euclidean')
    neighbors.fit(features_list)

    distance, indices = neighbors.kneighbors([extract_feature(image_path, model)])

    similar_products_ids = []
    for img_index in indices[0][0:10]:
        similar_products_ids.append(re.findall('\d+', files_name[img_index])[0])


    similar_products = []
    with open('dataset/products.json') as f:
        data = json.load(f)
        for product_id in similar_products_ids:
            for product in data['products']:
                if product['ProductId'] == product_id:
                    similar_products.append(product)

    return similar_products



app = Flask(__name__)
CORS(app)

# Products API Route

@app.route("/api/products")
def get_products():
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)
    with open('dataset/products.json') as f:
        data = json.load(f)

    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    paginated_products = data['products'][start_index:end_index]

    response = {"products": paginated_products, "total_pages": len(data['products']) // page_size + 1, "current_page": page}

    return jsonify(response)



@app.route('/api/upload', methods = ['POST'])
def get_uploaded_image():
    if request.method == 'POST':
        f = request.files['imageFile']
        im = Image.open(f.stream)
        uploaded_img_path = os.path.join('./uploads/', datetime.now().isoformat().replace(":", ".") + "_" + re.sub('[^A-Za-z0-9\.]+', '', f.filename))
        im.save(uploaded_img_path)
        similar_products = get_similar_products(uploaded_img_path)
        data = {"similar_products": similar_products}
        return jsonify(data)




