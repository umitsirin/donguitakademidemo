
import React, { useEffect } from 'react';
import { Course } from '../types';
import AdultCourseDetail from './AdultCourseDetail';
import KidsCourseDetail from './KidsCourseDetail';

interface CourseDetailPageProps {
  course: Course;
  onBack: () => void;
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ course, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [course]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {course.targetAudience === 'kids' ? (
        <KidsCourseDetail course={course} onBack={onBack} />
      ) : (
        <AdultCourseDetail course={course} onBack={onBack} />
      )}
    </div>
  );
};

export default CourseDetailPage;
