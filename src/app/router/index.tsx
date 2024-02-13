import {
  Route,
  Routes
} from "react-router-dom";
import App from "../../pages";
import { NotAuthorizedPage, SignInPage } from "../../pages/auth";
import { BookingPage } from "../../pages/booking";
import { RegistrPage } from "@/pages/registrasiya/regist";
import { BookingDetailPage } from "../../pages/booking/id";
import BookingCreationPage from "@/pages/booking/create";
import HotelDetailsPage from "@/pages/hotel/id";
import { YurtaCalendarPage } from "@/pages/calendar";
import { YurtaCalendarDateDetailsPage } from "@/pages/calendar/[date]";
import { RoomDetailsPage } from "@/pages/room/id";
import RoomPage from "@/pages/room";
import { RoomCreationPage } from "@/pages/room/create";
import { AccountPage } from "@/pages/account";
import { HotelPage } from "@/pages/hotel";

const Router = () =>
  <Routes>
    <Route path="/" element={<App />} />

    <Route path="/auth" element={<SignInPage />} />
    <Route path="/auth-error" element={<NotAuthorizedPage />} />
    <Route path="/registrasiya" element={<RegistrPage />} />

    <Route path="/booking" element={<BookingPage />} />
    <Route path="/booking/:id" element={<BookingDetailPage />} />
    <Route path="/booking/+" element={<BookingCreationPage />} />

    <Route path="/hotel" element={<HotelPage />} />
    <Route path="/hotel/:id" element={<HotelDetailsPage />} />

    <Route path="/room" element={<RoomPage />} />
    <Route path="/room/:id" element={<RoomDetailsPage />} />
    <Route path="/room/+" element={<RoomCreationPage />} />

    <Route path="/calendar" element={<YurtaCalendarPage />} />
    <Route path="/calendar/:date" element={<YurtaCalendarDateDetailsPage />} />

    <Route path="/account" element={<AccountPage />} />
  </Routes>


export default Router;

