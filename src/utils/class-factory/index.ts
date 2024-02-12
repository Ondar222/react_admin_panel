// import { default as Booking } from "@/entities/booking/model/interface";
import { default as User } from "@/entities/user/model/interface";

class ClassFactory {
  static createInstance(className: string) {
    switch (className) {
      case "Booking":
      // return new Booking();
      case "User":
        return new User();
      default:
        throw new Error("");
    }
  }
}

// async function importComponent(componentName: string) {
//   let component;

//   switch (componentName) {
//     case "Booking":
//       component = await import("@/entities/booking/model/interface");
//       break;
//     case "User":
//       component = await import("@/entities/user/model/interface");
//       break;
//     case "Hotel":
//       component = await import("@/entities/hotel/model/interface");
//       break;
//     case "Room":
//       component = await import("@/entities/room/model");
//       break;
//     default:
//       // Возвращаем базовый компонент, если имя не распознано
//       throw new Error("class was not found");
//   }
//   // return new component.default();
// }

export default ClassFactory;
// export { importComponent };
