import UserModel from "../models/user.js";
import ProblemModel from "../models/problem.js";

export const userProfile = async(req, res) => {
    try {
        const { username } = req.params;
        const user = await UserModel.findOne({ username : username});

        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        let allProblems = await ProblemModel.find();

        let easyProblems = 0;
        let mediumProblems = 0;
        let hardProblems = 0;

        let easySolved = 0;
        let mediumSolved = 0;
        let hardSolved = 0;

        for (let i = 0; i < allProblems.length; i++) {
            if (allProblems[i].main.difficulty === "easy") {
                easyProblems++;
                if (user.problems_solved.includes(allProblems[i].main.name)) {
                    easySolved++;
                }
            } 
            else if (allProblems[i].main.difficulty === "medium") {
                mediumProblems++;
                if (user.problems_solved.includes(allProblems[i].main.name)) {
                    mediumSolved++;
                }
            } 
            else {
                hardProblems++;
                if (user.problems_solved.includes(allProblems[i].main.name)) {
                    hardSolved++;
                }
            }
        }

        const publicUser = {
            username: user.username,
            email: user.email,
            submissions: user.submissions,
            problems_starred: user.problems_starred,
            problems_solved: user.problems_solved,
            easy_problems_count: easyProblems,
            medium_problems_count: mediumProblems,
            hard_problems_count: hardProblems,
            problems_solved_easy: easySolved,
            problems_solved_medium: mediumSolved,
            problems_solved_hard: hardSolved,
            problems_attempted: user.problems_attempted,
            problems_solved_count: user.problems_solved_count,
            rank: user.rank,
            views: user.views,
            solution_count: user.solution_count,
            reputation_count: user.reputation_count,
        };
    
        res.json(publicUser);
        
    } 
    catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message });
    }
};