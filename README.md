
# Dog Breed Identification Project

This project is a **Dog Breed Identification** system that allows users to upload images of dogs, and the model will predict the breed of the dog based on the image. The web application is built using **Flask**, and the model uses **Deep Learning** to classify different dog breeds.

## 📦 Project Structure

The project consists of two main components:
1. **Model**: The machine learning model to classify dog breeds.
   - This folder contains the model file (e.g., `model.h5`), dataset, and training scripts.
   
2. **Website**: A Flask-based web application that allows users to upload a dog's image and receive breed predictions.
   - This folder contains the HTML, CSS, and Python scripts for the web app.

```
📂 Project Structure:
- `Model/`
  - `dog_breed_model.h5` (Trained model file)
  - `training_scripts/`
  - `dataset/`
- `website/`
  - `app.py` (Flask app)
  - `templates/`
    - `index.html`
  - `static/`
    - `styles.css`
- `requirements.txt` (Dependencies)

---

## 🚀 How to Run the Project Locally

### Prerequisites
Make sure you have Python 3.12 installed and the following dependencies:

- Flask
- TensorFlow/Keras
- numpy
- pandas
- PIL
- other dependencies listed in `requirements.txt`

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Pippoo26/Dog_Breed_Identification_Project.git
   cd Dog_Breed_Identification_Project
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the Flask application:
   ```bash
   python website/app.py
   ```

4. Open your browser and go to `http://127.0.0.1:{Your Port Number}/` to access the web application.

---

## 🧠 Model Information

The model used for breed identification is a **Convolutional Neural Network (CNN)** trained on a large dataset of dog breeds. The trained model (`dog_breed_model.h5`) is used to predict the breed based on an uploaded image.

---

## 📑 How to Use the Web App

1. Open the app in your browser at `http://127.0.0.1:{Your Port Number}/`.
2. Click the **Upload Image** button to choose a dog image.
3. The app will display the predicted breed of the dog along with any related information (if included).

---

## 🛠️ Dependencies

The following packages are required to run the project:
- Flask
- TensorFlow
- Keras
- numpy
- pandas
- Pillow
- other dependencies listed in `requirements.txt`

You can install them via:

```bash
pip install -r requirements.txt
```

---

