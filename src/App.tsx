import { Outlet } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import { useEffect } from "react";
import { useAppSelector } from "./redux/hook";
import Swal from "sweetalert2";

function App() {
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (cartItems.length > 0) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    const handleReload = async (event: BeforeUnloadEvent) => {
      if (cartItems.length > 0) {
        event.preventDefault();

        const result = await Swal.fire({
          title: "Warning!",
          text: "You have items in your cart. Are you sure you want to leave?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, leave",
          cancelButtonText: "No, stay here",
        });

        if (result.isConfirmed) {
          window.location.reload();
        } else {
          // User canceled, do nothing
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("beforeunload", handleReload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("beforeunload", handleReload);
    };
  }, [cartItems]);

  return (
    <>
      <MainLayout />
      <Outlet />
    </>
  );
}

export default App;
