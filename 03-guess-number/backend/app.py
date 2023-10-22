from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Generate a random number between 1 and 100
target_number = random.randint(1, 100)

@app.route('/check-guess', methods=['POST'])
def check_guess():
    data = request.get_json()
    user_guess = data['guess']

    try:
        user_guess = int(user_guess)

        if user_guess < target_number:
            result = 'low'
            message = 'Try a higher number.'
        elif user_guess > target_number:
            result = 'high'
            message = 'Try a lower number.'
        else:
            result = 'correct'
            message = 'Congratulations! You guessed it!'

    except ValueError:
        result = 'invalid'
        message = 'Please enter a valid number between 1 and 100.'

    return jsonify({'result': result, 'message': message})

@app.route('/generate-new-number', methods=['GET'])
def generate_new_number():
    global target_number  # Access the global target number
    target_number = random.randint(1, 100)
    return jsonify({'message': 'New number generated'})

if __name__ == '__main__':
    app.run()
