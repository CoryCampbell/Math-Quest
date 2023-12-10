from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Adventure
from app import db

adventure_routes = Blueprint('adventures', __name__)


@adventure_routes.route('/<character_id>')
@login_required
def get_current_adventure(character_id):
    """
    Query for current unfinished adventure of a user
    """
    character_id = request.json.get("character_id")
    print("++++++++!+!+!+!+! character id : ", character_id)

    current_adventure = Adventure.query.filter_by(character_id=character_id, completed=False).first()
    print("============> current Adventure: ", current_adventure)

    if current_adventure:
        return current_adventure.to_dict()
    else:
        return {"No current adventure"}







@adventure_routes.route('/create', methods=["POST"])
@login_required
def create_new_adventure():
    """
    Route for creating and adding new character to database
    """
    character_id = request.json.get("character_id")
    score = request.json.get("score")
    adventure_type = request.json.get("adventure_type")
    completed = request.json.get("completed")

    new_adventure = Adventure(
        character_id=character_id,
        score=score,
        adventure_type=adventure_type,
        completed=completed
    )

    db.session.add(new_adventure)
    db.session.commit()

    return new_adventure.to_dict()


@adventure_routes.route('/<adventure_id>/<new_score>', methods=['PATCH'])
@login_required
def update_adventure(adventure_id, new_score):
    """
    Route for updating the current adventure once it is completed
    """
    adventure = Adventure.query.filter_by(id=adventure_id).first()
    if adventure:
        adventure.score = new_score
        adventure.completed = True

        db.session.commit()

        return {"message": repr("{adventure_id} score will now {new_score}!")}
    else:
        return {"error": repr("score value for adventure number #{adventure_id} could not be updated.")}


@adventure_routes.route('/<adventure_id>', methods=['DELETE'])
@login_required
def delete_current_adventure(adventure_id):
    """Route for deleting the current adventure, happens when you run away or pass out"""

    adventure = Adventure.query.filter_by(id=adventure_id).first()
    if adventure:
        db.session.delete(adventure)
        db.session.commit()
        return {"message": "Adventure succesfully deleted"}
    else:
        return {"error": "Adventure not found"}, 404
