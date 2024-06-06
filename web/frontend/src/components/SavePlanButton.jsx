import axios from "axios";
import { useNavigate } from "react-router-dom";

const SavePlanButton = ({
  destination,
  checkIn,
  checkOut,
  longitude,
  latitude,
  formattedActivities,
}) => {
  const navigate = useNavigate();

  const handleSavePlan = (e) => {
    e.preventDefault();
    const tripData = {
      destination,
      checkIn,
      checkOut,
      longitude,
      latitude,
    };
    // console.log("Trip Data:", tripData);

    // Validation check
    if (!tripData.destination || !tripData.checkIn || !tripData.checkOut) {
      Swal.fire(
        "Error",
        "Destination, start date and end date are required.",
        "error"
      );
      return;
    }

    axios
      .post("http://localhost:8007/api/trips", tripData)
      .then((response) => {
        console.log("Success:", response.data);
        // navigate("/login");
        Swal.fire(
          "Travel Plan saved!",
          `Your trip to ${destination} has been saved.`,
          "success"
        );
      })
      .catch((error) => console.error("Error:", error));

    axios
      .post("http://localhost:8007/api/activities", formattedActivities)
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <button
      onClick={handleSavePlan}
      className="btn btn-success btn-sm btn-position w-100"
    >
      Save Plan
    </button>
  );
};

export default SavePlanButton;
