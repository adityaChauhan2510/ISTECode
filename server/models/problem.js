import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    main: {
        id: Number,
        name: String,
        difficulty: String,
        like_count: Number,
        dislike_count: Number,
        status : String,
        description_body: String,
        accept_count: Number,
        submission_count: Number,
        acceptance_rate_count: Number,
        discussion_count: Number,
        related_topics: Array,
        similar_questions: Array,
        solution_count: Number,
        code_default_language: String,
        code_body: Object,
    },

    editorial: String,
    test: Array,
    function_name: String,
});

const ProblemModel = mongoose.model("Problem", problemSchema);
export default ProblemModel;
