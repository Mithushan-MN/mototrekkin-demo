import React from 'react';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';

const CourseDates = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const courses = [
    { month: 'JANUARY', dates: null, phase: null, status: 'SOLD OUT' },
    { month: 'FEBRUARY', dates: null, phase: null, status: 'SOLD OUT' },
    {
      month: 'MAR. 28,29',
      dates: new Date(2026, 2, 27), // March = month 2 (0-based)
      phase: 'MDP Phase I',
      status: null,
      registrationLink: '/registration-mdp-phase-1',
    },
    {
      month: 'APR. 25,26',
      dates: new Date(2026, 3, 24),
      phase: 'MDP Phase II',
      status: null,
      registrationLink: '/registration-mdp-phase-2',
    },
    {
      month: 'MAY 30,31',
      dates: new Date(2026, 4, 29), // May 30-31 → start date May 29?
      phase: 'MDP Phase III',
      status: null,
      registrationLink: '/registration-mdp-phase-3',
    },
    {
      month: 'JUNE 27,28,29',
      dates: null,
      phase: 'MDP Phase I',
      status: null,
    },
    {
      month: 'JULY 25,26',
      dates: null,
      phase: 'MDP Phase II',
      status: null,
    },
    { month: 'AUGUST', dates: null, phase: null, status: null,   },
    {
      month: 'SEPT. 26,27,28',
      dates: null,
      phase: 'MDP Phase I',
      status: null,
      registrationLink: '/registration-mdp-phase-1',
    },
    {
      month: 'OCT. 24,25,26',
      dates: null,
      phase: 'MDP Phase II',
      status: null,
      registrationLink: '/registration-mdp-phase-2',
    },
    {
      month: 'NOV. 28,29,30',
      dates: null,
      phase: 'MDP Phase III',
      status: null,
      registrationLink: '/registration-mdp-phase-3',
    },
    { month: 'DECEMBER', dates: null, phase: null, status: 'SOLD OUT' },
  ];

  const isCourseSoldOut = (courseDate) => {
    if (!courseDate) return false; // null date → we handle as OPEN SOON, not sold out
    const thresholdDate = new Date(today);
    thresholdDate.setDate(today.getDate() + 7);
    return courseDate < thresholdDate;
  };

  // Determine final display status
  const getCourseStatus = (course) => {
    if (course.status === 'SOLD OUT') return 'SOLD OUT';
    if (course.dates === null) return 'OPEN SOON';
    if (isCourseSoldOut(course.dates)) return 'SOLD OUT';
    return 'AVAILABLE';
  };

  // Stats
  const statusCounts = courses.reduce(
    (acc, course) => {
      const status = getCourseStatus(course);
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    { 'SOLD OUT': 0, AVAILABLE: 0, 'OPEN SOON': 0 }
  );

  return (
    <section id="course-dates" className="py-24 bg-gradient-to-br from-gray-50 via-white to-yellow-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-red-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" id="calender">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase animate-fade-in-up">
              📅 2026 Training Schedule
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-yellow-600 to-orange-600 mb-8 animate-fade-in-up animation-delay-200 leading-tight">
            2026 COURSE DATES
          </h2>

          <div className="flex justify-center mb-12 animate-fade-in-up animation-delay-400">
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full"></div>
          </div>

          <p className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed animate-fade-in-up animation-delay-600 max-w-4xl mx-auto">
            Find the perfect date for your Masterclass Development Program. Book early to secure your spot!
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 animate-fade-in-up animation-delay-800">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-900 via-black to-gray-800">
                <tr>
                  <th className="py-6 px-8 text-left">
                    <div className="flex items-center text-yellow-400">
                      <Calendar className="w-6 h-6 mr-3" />
                      <span className="text-lg font-bold">2026 DATES</span>
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

              <tbody className="divide-y divide-gray-100">
                {courses.map((course, index) => {
                  const status = getCourseStatus(course);
                  let statusColor = 'green';
                  let statusText = 'AVAILABLE';

                  if (status === 'SOLD OUT') {
                    statusColor = 'red';
                    statusText = 'SOLD OUT';
                  } else if (status === 'OPEN SOON') {
                    statusColor = 'blue';
                    statusText = 'OPEN SOON';
                  }

                  const phaseText = course.phase || 'NO COURSE AVAILABLE';

                  const actionContent =
                    status === 'AVAILABLE' ? (
                      <a
                        href={course.registrationLink}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        BOOK NOW
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    );

                  return (
                    <tr
                      key={index}
                      className={`hover:bg-gradient-to-r hover:from-${statusColor}-50 hover:to-${
                        statusColor === 'red' ? 'pink' : statusColor === 'blue' ? 'indigo' : 'emerald'
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

        {/* Summary Cards – now with Open Soon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-in-up animation-delay-1000">
          <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-sm border border-red-200 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">{statusCounts['SOLD OUT']}</span>
            </div>
            <h3 className="text-lg font-bold text-red-800 mb-2">SOLD OUT</h3>
            <p className="text-red-600 text-sm">Months fully booked</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">{statusCounts['OPEN SOON']}</span>
            </div>
            <h3 className="text-lg font-bold text-blue-800 mb-2">OPEN SOON</h3>
            <p className="text-blue-600 text-sm">Dates to be announced</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-200 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">{statusCounts['AVAILABLE']}</span>
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