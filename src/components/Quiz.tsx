import { Link } from 'react-router-dom';
import quizData from '../questions/quizData.json';

export interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

interface Category {
  name: string;
  questions: Question[];
}

export interface QuizData {
  categories: Category[];
}

const Quiz: React.FC = () => {
  return (
    <div className='max-w-md mx-auto'>
      <div className='flex justify-center'>
        <h2 className='text-2xl font-bold mb-4'>Choose a Category</h2>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        {quizData.categories.map((category, index) => (
          <Link
            key={index}
            to={`/quiz/${index}`} // Use the category index as a route parameter
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
