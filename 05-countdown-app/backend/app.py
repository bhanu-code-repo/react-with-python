from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///timers.db'  # Use SQLite for simplicity
db = SQLAlchemy(app)

class Timer(db.Model):
    id = db.Column(db.String, primary_key=True)
    event_name = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)
    time = db.Column(db.String, nullable=False)

    def __init__(self, id, event_name, date, time):
        self.id = id
        self.event_name = event_name
        self.date = date
        self.time = time

@app.route('/timers', methods=['GET'])
def get_timers():
    timers = Timer.query.all()
    timers_data = [{'id': timer.id, 'event_name': timer.event_name, 'date': timer.date, 'time': timer.time} for timer in timers]
    return jsonify(timers_data)

@app.route('/timers', methods=['POST'])
def create_timer():
    data = request.get_json()
    new_timer = Timer(id=data['id'], event_name=data['event_name'], date=data['date'], time=data['time'])
    db.session.add(new_timer)
    db.session.commit()
    return jsonify({'message': 'Timer created successfully'})

@app.route('/timers/<id>', methods=['DELETE'])
def delete_timer(id):
    timer = Timer.query.get(id)
    if timer:
        db.session.delete(timer)
        db.session.commit()
        return jsonify({'message': 'Timer deleted successfully'})
    return jsonify({'message': 'Timer not found'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
