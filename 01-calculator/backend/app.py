# Import Flask
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

# Create a Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for the app

@app.route('/calculate', methods=['POST'])
def calculate():
    """
    Calculate the result of a given mathematical expression.

    Parameters:
        None

    Returns:
        A JSON object containing the result of the expression if 
        successful, or an error message if an exception occurs.
    """
    # Get the expression from the request
    data = request.get_json()
    expression = data['expression']
    try:
        # Evaluate the expression
        result = eval(expression)
        # Return the result
        return jsonify({'result': result})
    except Exception as e:
        # Return an error
        return jsonify({'error': str(e)})

# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
