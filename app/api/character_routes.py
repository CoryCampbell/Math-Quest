from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Character

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
