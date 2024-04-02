import {
  Route,
  Routes
} from "react-router-dom";
import {
  AccountPage,
  HotelPage,
  SignUpPage,
  SignInPage,
  BookingPage,
  BookingDetailPage,
  RoomPage,
  RoomDetailsPage,
  RoomCreationPage,
  RoomlockDetailsPage,
  FirstStart
} from "@/pages";
import { AuthProvider } from "@/features/auth/api/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";

const Router = () =>
  <Routes>

    <Route path="/" element={<SignUpPage />} />

    <Route path="/auth" element={<SignInPage />} />
    <Route path="/sign_up" element={<SignUpPage />} />

    <Route path="/booking"
      element={
        <ProtectedRoute>
          <BookingPage />
        </ProtectedRoute>
      } />

    <Route path="/booking/:id"
      element={
        <ProtectedRoute>
          <BookingDetailPage />
        </ProtectedRoute>
      } />

    <Route path="/hotel"
      element={
        <ProtectedRoute onboardCheck={true}>
          <HotelPage />
        </ProtectedRoute>
      } />

    <Route path="/room"
      element={
        <ProtectedRoute>
          <RoomPage />
        </ProtectedRoute>
      } />
    <Route path="/room/:id"
      element={
        <ProtectedRoute>
          <RoomDetailsPage />
        </ProtectedRoute>
      } />

    <Route path="/room/+"
      element={
        <ProtectedRoute>
          <RoomCreationPage />
        </ProtectedRoute>
      } />

    <Route path="/account"
      element={
        <ProtectedRoute>
          <AccountPage />
        </ProtectedRoute>
      } />

    <Route path="/roomlock/:id"
      element={
        <ProtectedRoute>
          <RoomlockDetailsPage />
        </ProtectedRoute>
      } />

    <Route path="/404" element={<div></div>} />


    <Route
      path="/onboarding"
      element={
        <ProtectedRoute onboardCheck={false}>
          <FirstStart />
        </ProtectedRoute>
        
      } />
  </Routes>

export default Router;

