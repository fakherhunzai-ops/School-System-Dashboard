import { lazy, Suspense } from 'react';
import { type RouteObject, Navigate } from 'react-router-dom';

// Lazy‑load pages – include the trailing "/page" for all components
const Welcome = lazy(() => import('../pages/welcome/page'));
const LoginSelect = lazy(() => import('../pages/login-select/page'));
const SignupSelect = lazy(() => import('../pages/signup-select/page'));
const Login = lazy(() => import('../pages/login/page'));
const SignupParent = lazy(() => import('../pages/signup-parent/page'));
const SignupSchool = lazy(() => import('../pages/signup-school/page'));
const Dashboard = lazy(() => import('../pages/dashboard/page'));
const Attendance = lazy(() => import('../pages/attendance/page'));
const AttendanceSummary = lazy(() => import('../pages/attendance-summary/page'));
const FlaggedStudents = lazy(() => import('../pages/flagged-students/page'));
const StudentProfile = lazy(() => import('../pages/student-profile/page'));
const Communication = lazy(() => import('../pages/communication/page'));
const FollowUps = lazy(() => import('../pages/follow-ups/page'));
const Reports = lazy(() => import('../pages/reports/page'));
const Settings = lazy(() => import('../pages/settings/page'));
const ClassSchedule = lazy(() => import('../pages/class-schedule/page'));
const ParentPortal = lazy(() => import('../pages/parent-portal/page'));
const ParentGrades = lazy(() => import('../pages/parent-grades/page'));
const ParentMessages = lazy(() => import('../pages/parent-messages/page'));
const ParentHomework = lazy(() => import('../pages/parent-homework/page'));
const ParentMeetings = lazy(() => import('../pages/parent-meetings/page'));
const ParentNotifications = lazy(() => import('../pages/parent-notifications/page'));
const NotFound = lazy(() => import('../pages/NotFound'));
const SuperAdminLogin = lazy(() => import('../pages/super-admin-login/page'));
const SuperAdmin2FA = lazy(() => import('../pages/super-admin-2fa/page'));
const SuperAdminDashboard = lazy(() => import('../pages/super-admin-dashboard/page'));
const SuperAdminSchools = lazy(() => import('../pages/super-admin-schools/page'));
const SuperAdminSchoolDetail = lazy(() => import('../pages/super-admin-school-detail/page'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/welcome" replace />,
  },
  {
    path: '/welcome',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <Welcome />
      </Suspense>
    ),
  },
  {
    path: '/login-select',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <LoginSelect />
      </Suspense>
    ),
  },
  {
    path: '/signup-select',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <SignupSelect />
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/signup-parent',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <SignupParent />
      </Suspense>
    ),
  },
  {
    path: '/signup-school',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <SignupSchool />
      </Suspense>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: '/attendance',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <Attendance />
      </Suspense>
    ),
  },
  {
    path: '/attendance-summary',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <AttendanceSummary />
      </Suspense>
    ),
  },
  {
    path: '/flagged-students',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <FlaggedStudents />
      </Suspense>
    ),
  },
  {
    path: '/student/:id',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <StudentProfile />
      </Suspense>
    ),
  },
  {
    path: '/communication/:id',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <Communication />
      </Suspense>
    ),
  },
  {
    path: '/follow-ups',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <FollowUps />
      </Suspense>
    ),
  },
  {
    path: '/reports',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <Reports />
      </Suspense>
    ),
  },
  {
    path: '/settings',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <Settings />
      </Suspense>
    ),
  },
  {
    path: '/class-schedule',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <ClassSchedule />
      </Suspense>
    ),
  },
  {
    path: '/parent-portal',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <ParentPortal />
      </Suspense>
    ),
  },
  {
    path: '/parent-grades',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <ParentGrades />
      </Suspense>
    ),
  },
  {
    path: '/parent-messages',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <ParentMessages />
      </Suspense>
    ),
  },
  {
    path: '/parent-homework',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <ParentHomework />
      </Suspense>
    ),
  },
  {
    path: '/parent-meetings',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <ParentMeetings />
      </Suspense>
    ),
  },
  {
    path: '/parent-notifications',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <ParentNotifications />
      </Suspense>
    ),
  },
  {
    path: '/super-admin-login',
    element: (
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
        <SuperAdminLogin />
      </Suspense>
    ),
  },
  {
    path: '/super-admin-2fa',
    element: (
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
        <SuperAdmin2FA />
      </Suspense>
    ),
  },
  {
    path: '/super-admin-dashboard',
    element: (
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
        <SuperAdminDashboard />
      </Suspense>
    ),
  },
  {
    path: '/super-admin/schools',
    element: (
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
        <SuperAdminSchools />
      </Suspense>
    ),
  },
  {
    path: '/super-admin/schools/:id',
    element: <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}><SuperAdminSchoolDetail /></Suspense>,
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<div>Loading…</div>}>
        <NotFound />
      </Suspense>
    ),
  },
];

export default routes;
