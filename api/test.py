
import pickle
import qgn

from create_acronym import generate_acronym

test_word = "play"
acronym_data = ["quotes", "shakespeare", "state_union", "inaugural", "bible", "all"]
top_acro = generate_acronym(test_word, acronym_data[4])
print(top_acro)