from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Adventure
from app import db

adventure_routes = Blueprint('adventures', __name__)


# @character_routes.route('/all')
# @login_required
# def get_user_characters():
#     """
#     Query for all characters of a user
#     """

#     allCharacters = Character.query.filter_by(user_id=current_user.id).all()
#     print("============> all user characters", allCharacters)

#     return [character.to_dict() for character in allCharacters]








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

    # THIS SHOULD BE INSIDE UPDATE ADVENTURE?
    # if new_adventure.completed === True:
        # print("adventure completed!!!")
    # db.session.add(new_adventure)
    # db.session.commit()

    return new_adventure.to_dict()


# @character_routes.route('/<int:character_id>/delete', methods=["DELETE"])
# @login_required
# def delete_character(character_id):

#     character = Character.query.filter_by(id=character_id, user_id=current_user.id).first()
#     if character:
#         character_name = character.to_dict()["character_name"]
#         db.session.delete(character)
#         db.session.commit()
#         return {"message": repr("{character_name} has decided to part ways with you. They will not appear in your Characters list anymore.")}
#     else:
#         return {"error": repr("{character_name} could not be parted with.")}


# @character_routes.route('/<old_character_name>/<new_character_name>', methods=['PATCH'])
# @login_required
# def update_character(old_character_name, new_character_name):
#     print("========= req data ======>", old_character_name, new_character_name)
#     character = Character.query.filter_by(character_name=old_character_name, user_id=current_user.id).first()
#     print("=======> before change: ", character.to_dict()["character_name"])
#     if character:
#         character.character_name = new_character_name

#         print("after change ============> ", character.to_dict()["character_name"])
#         db.session.commit()

#         return {"message": repr("{old_character_name} will now be known as {new_character_name}!")}
#     else:
#         return {"error": repr("{old_character_name}'s name could not be changed.")}
