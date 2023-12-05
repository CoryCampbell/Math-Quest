from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Character
from app import db

character_routes = Blueprint('characters', __name__)


@character_routes.route('/all')
@login_required
def get_user_characters():
    """
    Query for all characters of a user
    """

    allCharacters = Character.query.filter_by(user_id=current_user.id).all()
    print("============> all user characters", allCharacters)

    return [character.to_dict() for character in allCharacters]








@character_routes.route('/create', methods=["POST"])
@login_required
def create_new_character():
    """
    Route for creating and adding new character to database
    """
    character_name = request.json.get("character_name")
    appearance = request.json.get("appearance")
    user_id = request.json.get("user_id")
    difficulty = request.json.get("difficulty")
    level = request.json.get("level")
    max_health = request.json.get("max_health")
    current_health = request.json.get("current_health")
    experience_points = request.json.get("experience_points")
    coins = request.json.get("coins")


    allCharacters = Character.query.filter_by(user_id=current_user.id).all()
    print("============> all user characters", allCharacters)

    new_character = Character(
        character_name=character_name,
        appearance=appearance,
        user_id=user_id,
        difficulty=difficulty,
        level=level,
        max_health=max_health,
        current_health=current_health,
        experience_points=experience_points,
        coins=coins
    )

    db.session.add(new_character)
    db.session.commit()

    return new_character.to_dict()




@character_routes.route('/delete', methods=["DELETE"])
@login_required
def delete_character(character_id):
    print(character_id)
    character = Character.query.filter_by(id=character_id).first()
    character_name = character["character_name"]

    if character:
        db.session.delete(character)
        db.session.commit()
        return {"message": repr("{character_name} has decided to part ways with you. They will not appear in your Characters list anymore.")}
    else:
        return {"error": repr("{character_name} could not be parted with.")}
