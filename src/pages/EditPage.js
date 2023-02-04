import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Input,
    Radio,
    Button,
    Chip,
    Textarea
} from "@material-tailwind/react";
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useParams } from 'react-router-dom';
export default function EditPage(props) {

    const [data, setData] = useState({
        "created": "",
        "description": "",
        "id": '',
        "modified": "",
        "questions_answers": [],
        "score": null,
        "title": "",
        "url": ""
    });
    let { id } = useParams();
    useEffect(() => {
        const quizId = Number(id);

        (async () => {

            try {

                const data = await fetch('../api/data.json');
                const response = await data.json();
                const quiz = response.quizzes.find(el => el.id === quizId);
                console.log("Questions: ", quiz.questions_answers)
                setData(quiz)

            } catch (err) {
                console.log('ERR: ', err);
            }


        })()


    }, [])

    const handleChanges = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(values => ({ ...values, [name]: value }))
    }

    const handleQuestionChanges = (e) => {
        const questionIndex = Number(e.target.name);
        const value = e.target.value;
        //console.log(id, value)
        const changedQuestions = data.questions_answers.map((el, index) => (index === questionIndex) ? { ...el, "text": value } : el)
        setData(values => ({ ...values, "questions_answers": changedQuestions }))
    }

    const handleQuestionFeedback = (e, feedback) => {
        const questionIndex = Number(e.target.name);
        const value = e.target.value;

        //console.log(id, value)
        const changedQuestions = data.questions_answers.map((el, index) => (index === questionIndex) ? { ...el, [feedback]: value } : el)
        setData(values => ({ ...values, "questions_answers": changedQuestions }))
    }

    const handleAnswerChanges = (e, questionIndex) => {
        const answerIndex = Number(e.target.name);
        const value = e.target.value;

        // console.log(id, value)
        const changedAnswer = data.questions_answers.map(
            (el, index) => {
                if (index === questionIndex) {
                    return {
                        ...el, "answers":
                            el.answers.map((answer, index) => index === answerIndex
                                ? { ...answer, "text": value }
                                : answer)
                    }
                }
                else {
                    return el;
                }
            })

        // console.log("changed Answers: ", changedAnswer)
        setData(values => ({ ...values, "questions_answers": changedAnswer }))
    }

    const handleAnswerTrueChanges = (e, questionIndex) => {

        const answerIndex = Number(e.target.value);

        // console.log(id, value)
        const changedAnswer = data.questions_answers.map(
            (el, index) => {
                if (index === questionIndex) {
                    return {
                        ...el, "answers":
                            el.answers.map((answer, index) => index === answerIndex
                                ? { ...answer, "is_true": true }
                                : { ...answer, "is_true": false })
                    }
                }
                else {
                    return el;
                }
            })

        console.log("changed Answers: ", changedAnswer)
        setData(values => ({ ...values, "questions_answers": changedAnswer }))

    }
    const removeQuestion = (e, questionIndex) => {

        const filterdQuestions = data.questions_answers.filter((question, index) => index !== questionIndex);
        setData(values => ({ ...values, "questions_answers": filterdQuestions }))


        //console.log(id, value)
    }

    const removeAnswer = (questionIndex, answerIndex) => {


        //console.log(id, value)
        const filterdAnswers = data.questions_answers.map((question, index) => index === questionIndex ? { ...question, answers: question.answers.filter((answer, index) => index !== answerIndex) } : question);
        setData(values => ({ ...values, "questions_answers": filterdAnswers }))
    }
    const handleNewQuestion = () => {
        const newQuestion = {
            "answer_id": null,
            "answers": [
                {

                    "is_true": false,
                    "text": ""
                },
                {

                    "is_true": false,
                    "text": ""
                },

            ],
            "feedback_false": "",
            "feedback_true": "",

            "text": ""
        };
        setData(values => ({ ...values, "questions_answers": [...values.questions_answers, newQuestion] }))
    }
    const handleNewAnswer = (questionIndex) => {
        const newAnswer = {

            "is_true": false,
            "text": ""
        };
        const newAnswers = data.questions_answers.map((question, index) => index === questionIndex ? { ...question, answers: [...question.answers, newAnswer] } : question);
        setData(values => ({ ...values, "questions_answers": newAnswers }))
    }

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12 ">
            <Card>
                <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        Edit Quiz
                    </Typography>
                </CardHeader>

                <CardBody className="overflow-x px-0 pt-0 pb-2 text-left relative   lg:grid lg:grid-cols-3 gap-4">
                    <div className='lg:col-span-2'>
                        <form className='p-4 lg:px-16' onSubmit={e => e.preventDefault()}>

                            <div className="w-100 pb-6">

                                <Input name="title" variant="outlined" label="Title" value={data.title} onChange={handleChanges} />
                            </div>
                            <div className="w-100 pb-6">

                                <Textarea name="description" variant="outlined" label="Description" value={data.description} onChange={handleChanges} />
                            </div>
                            <div className="w-100">
                                <Input variant="outlined" label="Url" value={data.url} name="url" onChange={handleChanges} />
                            </div>

                            {data.questions_answers?.map((question, questionIndex) => (

                                <div key={questionIndex} className='question p-5 mt-7 border rounded-md'>

                                    <button onClick={(e) => removeQuestion(e, questionIndex)}><XMarkIcon className='w-4 h-4 text-red-900' /></button>

                                    <Input variant="outlined" label="Question" value={question.text} name={questionIndex} onChange={handleQuestionChanges} />

                                    <div className='answers '>

                                        {question.answers.map((answer, answerIndex) => (
                                            <div key={answerIndex} className='answer p-5 mt-4 border rounded-md'>

                                                <button onClick={() => removeAnswer(questionIndex, answerIndex)}><XMarkIcon className='w-4 h-4 text-red-900' /></button>
                                                <Input variant="outlined" label="Answer"
                                                    value={answer.text} name={answerIndex} onChange={(e) => handleAnswerChanges(e, questionIndex)} />
                                                <Radio
                                                    id={Math.random() * 1000}
                                                    name={questionIndex}
                                                    label="True"
                                                    color="green"
                                                    icon={
                                                        <CheckIcon className='w-4 h-4' />
                                                    }
                                                    value={answerIndex}
                                                    defaultChecked={answer.is_true ? 'true' : ''}
                                                    onChange={(e) => handleAnswerTrueChanges(e, questionIndex)}
                                                />

                                            </div>
                                        )
                                        )}


                                        <Button className='my-5' onClick={() => handleNewAnswer(questionIndex)}>+ New Answer</Button>

                                    </div>
                                    <div className='mt-6'>
                                        <Input label='False feedback' value={question.feedback_false} name={questionIndex} onChange={(e) => handleQuestionFeedback(e, "feedback_false")} />
                                    </div>
                                    <div className='mt-6'>
                                        <Input label='True feedback' value={question.feedback_true} name={questionIndex} onChange={(e) => handleQuestionFeedback(e, "feedback_true")} />
                                    </div>
                                </div>
                            ))}
                            <Button color="green" className='ml-3' onClick={handleNewQuestion}>+ Add new question</Button>
                        </form>
                    </div>
                    <div className='publish'>
                        <div className='rounded-md bg-gray-50 mr-4 p-6 shadow-gray-500/20 shadow-lg border'>

                            <Chip
                                variant="gradient"
                                color="blue-gray"
                                value="Publish date: "
                                className="py-0.5 px-2 text-[14px] font-medium"
                            />  {data ? <Typography variant="small" color="black" className='p-3'>
                                {data.created}
                            </Typography> : ''}

                            <Chip
                                variant="gradient"
                                color="blue-gray"
                                value="Modified date: "
                                className="py-0.5 px-2 text-[14px] font-medium"
                            />
                            {data ? <Typography variant="small" color="black" className='p-3'>
                                {data.modified}
                            </Typography> : ''}

                            <Button color="green" className='ml-3'>Publish  </Button>
                        </div>
                    </div>
                </CardBody>


            </Card>
        </div>
    )
}
