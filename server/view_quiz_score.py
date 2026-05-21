
#Score calculation logic
def check_answer(question, user_input, correct_answer):
    score = 0
    for user_answer in user_input:
        print("\n" + question)
        #Check the user's answer against the correct answer
        if user_input == correct_answer:
            score += 1
            print("\nCorrect Answer!")
        else:
            print("wrong answer!")

#Display Score
def display_score(total_score, total_questions):
    return{'Results': total_score + "/" + total_questions + "are correct!"}



    

    
    
        
