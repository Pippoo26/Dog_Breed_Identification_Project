import random
from flask import Flask, render_template, request, redirect, url_for
import os
import time

from matplotlib.style.core import available
from werkzeug.utils import secure_filename
from PIL import Image
import math
import tensorflow as tf
import numpy as np
import  requests


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = "static/uploads/"
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload

# Create uploads directory if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Mock data for demonstration purposes
def get_breed_info(breed_name):
    # -->> Getting breed info through api **Note**: some of the breed info is not availabel in that case website might get crashed
    API_KEY_1 = "live_7FSAdYL1ttP8Ws9s6MhOFfLeHsAm8OSU6XPoKfwubD6szR5j8BQ83ZrXhsbhTPqa"
    API_KEY_2 = "/g6N+Krh7rkaSKpZcTDO6g==SgqqKk0J3QC7mb2s"

    # 1st api to get breed info
    info_url = f"https://api.thedogapi.com/v1/breeds/search?q={breed_name}"
    headers = {
        "x_api_key": API_KEY_1
    }
    info_response = requests.get(info_url,headers=headers).json()


    # 2nd api to get breed rating
    rating_url = url = f'https://api.api-ninjas.com/v1/dogs?name={breed_name.replace("_", " ")}'
    headers_2 = {
        "X-Api-Key": API_KEY_2
    }
    rating_response = requests.get(rating_url, headers=headers_2).json()


    # structure for breed informations
    if len(rating_response)==0 or len(info_response) == 0 :
        if len(rating_response)==0 and len(info_response) == 0:
            breed_name = breed_name
            breed_info = {
                'description': "Unfortunately, data is not availabel",
                'weight': "Unfortunately, data is not availabel",
                'temperament': "Unfortunately, data is not availabel",
                'height': "Unfortunately, data is not availabel",
                'lifespan': "Unfortunately, data is not availabel",
                'ratings': {
                    'friendliness': 0,
                    'energy': 0,
                    'trainability': 0,
                    'grooming': 0,
                }
            }
        elif len(rating_response) == 0:
            breed_name = info_response[0]["name"]
            breed_info = {
                'description': f'The {info_response[0]["name"]} is a wonderful dog breed with unique characteristics and traits.',
                'weight': f'{info_response[0]["weight"]["imperial"]}',
                'temperament': f'{info_response[0]["temperament"]}',
                'height': f'{info_response[0]["height"]["imperial"]}',
                'lifespan': f'{info_response[0]["life_span"]}',
                'ratings': {
                    'friendliness': 0,
                    'energy': 0,
                    'trainability': 0,
                    'grooming': 0,
                }
            }
        elif len(info_response) == 0 :
            breed_name = rating_response[0]["name"]
            breed_info = {
                'description': "Unfortunately, data is not availabel",
                'weight': "Unfortunately, data is not availabel",
                'temperament': "Unfortunately, data is not availabel",
                'height': "Unfortunately, data is not availabel",
                'lifespan': "Unfortunately, data is not availabel",
                'ratings': {
                    'friendliness': rating_response[0]["playfulness"],
                    'energy': rating_response[0]["energy"],
                    'trainability': rating_response[0]["trainability"],
                    'grooming': rating_response[0]["grooming"],
                }
            }



    else:
        breed_name = rating_response[0]["name"]
        breed_info = {
            'description': f'The {info_response[0]["name"]} is a wonderful dog breed with unique characteristics and traits.',
            'weight': f'{info_response[0]["weight"]["imperial"]}',
            'temperament': f'{info_response[0]["temperament"]}',
            'height': f'{info_response[0]["height"]["imperial"]}',
            'lifespan': f'{info_response[0]["life_span"]}',
            'ratings': {
                    'friendliness': rating_response[0]["playfulness"],
                    'energy': rating_response[0]["energy"],
                    'trainability': rating_response[0]["trainability"],
                    'grooming': rating_response[0]["grooming"],
            }
        }
    return [breed_name, breed_info]



# prediction function
def predict_breed():

    class_name = sorted(os.listdir("../Model/dog_breed_data/train"))

    image_path = "../Website/static/uploads/" + os.listdir("../Website/static/uploads")[-1]
    img = Image.open(image_path).resize((384, 384))
    img = np.array(img)
    img = np.expand_dims(img, axis=0)

    model = tf.keras.models.load_model("../Model/Saved_model/model_1.keras")

    row_result = model.predict(img)

    breed = class_name[np.argmax(row_result)]
    confidence = int(row_result[0][np.argmax(row_result)] * 100)

    top_prediction = []
    for i in np.argsort(row_result)[0, -4:-1]:
        prediction = {
            "breed": class_name[i],
            "confidence": math.ceil(row_result[0][i] * 100),
        }
        top_prediction.append(prediction)
    return breed, confidence, top_prediction


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return redirect(url_for('index'))

    file = request.files['file']

    if file.filename == '':
        return redirect(url_for('index'))

    if file and allowed_file(file.filename):
        # Save the uploaded file
        filename = secure_filename(file.filename)
        timestamp = str(int(time.time()))
        filename = f"{timestamp}_{filename}"
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Make prediction
        breed_name, confidence, top_predictions = predict_breed()

        # Get breed information
        breed_info = get_breed_info(breed_name)
        breed_name = breed_info[0]
        breed_description = breed_info[1]['description']

        if breed_info[1]["temperament"] == "Unfortunately, data is not availabel" :
            temperament_dog = "Unfortunately, data is not availabel"
        else:
            temperament_dog = ",".join(random.sample(breed_info[1]["temperament"].split(","),3))

        return render_template('result.html',
                               filename=filename,
                               breed_name=breed_name,
                               confidence=confidence,
                               top_predictions=top_predictions,
                               breed_description=breed_description,
                               breed_info=breed_info[1],
                               temperament = temperament_dog)

    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True, port=5001)



