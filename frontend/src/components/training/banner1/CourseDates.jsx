import React from 'react';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';

const CourseDates = () => {
  // Get current date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day for comparison

  // Define course data with specific dates
  const courses = [
    { month: 'JANUARY', dates: null, phase: null, status: 'SOLD OUT' },
    { month: 'FEBRUARY', dates: null, phase: null, status: 'SOLD OUT' },
    { month: 'MAR. 28,29,30', dates: new Date(2025, 2, 28), phase: 'MDP Phase I', status: 'SOLD OUT' },
    { month: 'APR. 25,26,27', dates: new Date(2025, 3, 25), phase: 'MDP Phase II', status: 'SOLD OUT' },
    { month: 'MAY 23,24,25', dates: new Date(2025, 4, 23), phase: 'MDP Phase I', status: 'SOLD OUT' },
    { month: 'JUNE 27,28,29', dates: new Date(2025, 5, 27), phase: 'MDP Phase II', status: 'SOLD OUT' },
    { month: 'JULY', dates: null, phase: null, status: 'SOLD OUT' },
    { month: 'AUGUST', dates: null, phase: null, status: 'SOLD OUT' },
    { month: 'SEPT. 26,27,28', dates: new Date(2025, 8, 26), phase: 'MDP Phase I', status: 'SOLD OUT' },
    {
      month: 'OCT. 24,25,26',
      dates: new Date(2025, 9, 24),
      phase: 'MDP Phase II',
      status: null, // Will be determined dynamically
      registrationLink: '/registration-mdp-phase-2',
    },
    {
      month: 'NOV. 28,29,30',
      dates: new Date(2025, 10, 28),
      phase: 'MDP Phase III',
      status: null, // Will be determined dynamically
      registrationLink: '/registration-mdp-phase-3',
    },
    { month: 'DECEMBER', dates: null, phase: null, status: 'SOLD OUT' },
  ];

  // Function to determine if a course is sold out based on date
  const isCourseSoldOut = (courseDate) => {
    if (!courseDate) return true; // No date means sold out (e.g., January, July)
    // Consider a course sold out if it's in the past or too close (e.g., within 7 days)
    const thresholdDate = new Date(today);
    thresholdDate.setDate(today.getDate() + 7); // 7-day threshold
    return courseDate < thresholdDate;
  };

  // Calculate summary stats
  const availableCourses = courses.filter(
    (course) => course.status === null && !isCourseSoldOut(course.dates)
  ).length;
  const soldOutCourses = courses.length - availableCourses;

  return (
    <section id="course-dates" className="py-24 bg-gradient-to-br from-gray-50 via-white to-yellow-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-red-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" id='calender'>
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase animate-fade-in-up">
              📅 2025 Training Schedule
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-yellow-600 to-orange-600 mb-8 animate-fade-in-up animation-delay-200 leading-tight">
            2025 COURSE DATES
          </h2>

          <div className="flex justify-center mb-12 animate-fade-in-up animation-delay-400">
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full"></div>
          </div>

          <p className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed animate-fade-in-up animation-delay-600 max-w-4xl mx-auto">
            Find the perfect date for your Masterclass Development Program. Book early to secure your spot!
          </p>
        </div>

        {/* Course Dates Table */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 animate-fade-in-up animation-delay-800">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              {/* Table Header */}
              <thead className="bg-gradient-to-r from-gray-900 via-black to-gray-800">
                <tr>
                  <th className="py-6 px-8 text-left">
                    <div className="flex items-center text-yellow-400">
                      <Calendar className="w-6 h-6 mr-3" />
                      <span className="text-lg font-bold">2025 DATES</span>
                    </div>
                  </th>
                  <th className="py-6 px-8 text-left">
                    <div className="flex items-center text-yellow-400">
                      <MapPin className="w-6 h-6 mr-3" />
                      <span className="text-lg font-bold">WHERE</span>
                    </div>
                  </th>
                  <th className="py-6 px-8 text-left">
                    <div className="flex items-center text-yellow-400">
                      <Clock className="w-6 h-6 mr-3" />
                      <span className="text-lg font-bold">STATUS</span>
                    </div>
                  </th>
                  <th className="py-6 px-8 text-left">
                    <div className="flex items-center text-yellow-400">
                      <ExternalLink className="w-6 h-6 mr-3" />
                      <span className="text-lg font-bold">ACTION</span>
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">
                {courses.map((course, index) => {
                  const isSoldOut = course.status === 'SOLD OUT' || isCourseSoldOut(course.dates);
                  const statusText = isSoldOut ? 'SOLD OUT' : 'AVAILABLE';
                  const statusColor = isSoldOut ? 'red' : 'green';
                  const phaseText = course.phase || 'NO COURSE AVAILABLE';
                  const actionContent = isSoldOut ? (
                    <span className="text-red-400 text-sm">-</span>
                  ) : (
                    <a
                      href={course.registrationLink}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      BOOK NOW
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  );

                  return (
                    <tr
                      key={index}
                      className={`hover:bg-gradient-to-r hover:from-${statusColor}-50 hover:to-${
                        statusColor === 'red' ? 'pink' : 'emerald'
                      }-50 transition-all duration-300`}
                    >
                      <td className="py-6 px-8">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 bg-${statusColor}-500 rounded-full mr-4`}></div>
                          <span className={`text-lg font-semibold text-${statusColor}-600`}>{course.month}</span>
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        {course.phase ? (
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${statusColor}-100 text-${statusColor}-800 border border-${statusColor}-200`}
                          >
                            {phaseText}
                          </span>
                        ) : (
                          <span className={`text-${statusColor}-600`}>{phaseText}</span>
                        )}
                      </td>
                      <td className="py-6 px-8">
                        <span
                          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-${statusColor}-100 text-${statusColor}-800 border border-${statusColor}-200`}
                        >
                          {statusText}
                        </span>
                      </td>
                      <td className="py-6 px-8">{actionContent}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-in-up animation-delay-1000">
          <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-sm border border-red-200 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">{soldOutCourses}</span>
            </div>
            <h3 className="text-lg font-bold text-red-800 mb-2">SOLD OUT</h3>
            <p className="text-red-600 text-sm">Months fully booked</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border border-orange-200 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">0</span>
            </div>
            <h3 className="text-lg font-bold text-orange-800 mb-2">90% SOLD</h3>
            <p className="text-orange-600 text-sm">Limited spots remaining</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-200 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">{availableCourses}</span>
            </div>
            <h3 className="text-lg font-bold text-green-800 mb-2">AVAILABLE</h3>
            <p className="text-green-600 text-sm">Book your spot now</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDates;