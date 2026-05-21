
#Score calculation logic
def check_answer(question, user_input, correct_answer):
    score = 0
    for user_answer in user_input:
        print("\n" + question)
        #Check the user's answer against the correct answer
        if user_answer == correct_answer:
            score += 1

#Display Score
def display_score(score, total_questions):
    return{'Results': score + "/" + total_questions + "are correct!"}



    

    
    
        
