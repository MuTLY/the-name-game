import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./game-loop.css";
import correctMark from "../assets/images/correct-mark.svg";
import incorrectMark from "../assets/images/incorrect-mark.svg";
import spacerGif from "../assets/images/spacer.gif";

// Move fetchEmployeeData outside the component to avoid useEffect dependency warning
const fetchEmployeeData = async (setEmployeeData, navigate) => {
  try {
    const response = await fetch(
      "https://namegame.willowtreeapps.com/api/v1.0/profiles"
    );

    if (!response.ok) {
      console.log("Network response was not ok");
      navigate("/error");
      throw new Error("Network response was not OK");
    }

    const data = await response.json();
    setEmployeeData(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    navigate("/error");
  }
};

const GameLoop = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [randomEmployeeIds, setRandomEmployeeIds] = useState([]);
  const [randomEmployee, setRandomEmployee] = useState({ id: "" });
  const [markState, setMarkState] = useState({ id: null, result: null }); // result: 'correct' | 'incorrect' | null
  const [score, setScore] = useState(0); // Initialize score state

  const navigate = useNavigate();

  // This function returns a set of random IDs from the provided array
  const getRandomIds = (arr, numIds) => {
    if (!Array.isArray(arr) || arr.length === 0 || numIds <= 0) {
      return [];
    }
    if (numIds > arr.length) {
      numIds = arr.length; // Adjust numIds if it's greater than the array length
    }

    // Use a Set to avoid duplicates
    const randomIds = new Set();

    while (randomIds.size < numIds && arr.length > 0) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      const randomId = arr[randomIndex].id; // Assuming each object has an 'id' property
      randomIds.add(randomId);
      arr.splice(randomIndex, 1); // Remove the selected object to avoid duplicates
    }
    return Array.from(randomIds);
  };

  useEffect(() => {
    if (!employeeData) {
      console.log("Fetching employee data...");
      fetchEmployeeData(setEmployeeData, navigate);
    }
  }, [employeeData, navigate]); // Dependency array includes employeeData to avoid refetching

  useEffect(() => {
    // This effect runs whenever employeeData changes
    if (employeeData && employeeData.length > 0) {
      console.log("Employee data has been updated:", employeeData);
      // You can perform additional actions here, like updating the UI

      const ids = getRandomIds([...employeeData], 6);
      setRandomEmployeeIds(ids);
    }
  }, [employeeData]);

  useEffect(() => {
    // This effect runs whenever randomEmployeeIds changes
    // It sets a random employee from the randomEmployeeIds array
    if (randomEmployeeIds.length > 0) {
      console.log("Random IDs have been updated:", randomEmployeeIds);

      const randomEmployeeId =
        randomEmployeeIds[Math.floor(Math.random() * randomEmployeeIds.length)];
      setRandomEmployee({ id: randomEmployeeId });
    }
  }, [randomEmployeeIds]);

  return (
    <div className="game-loop">
      <div className="card">
        <h2>Try matching the WillowTree employee to their photo.</h2>

        {randomEmployee.id && (
          <h3>
            {employeeData.find((e) => e.id === randomEmployee.id)?.firstName ||
              "Unknown"}
          </h3>
        )}
      </div>
      <div className="thumbs">
        {randomEmployeeIds.map((id) => {
          const employeeInfo = employeeData.find(
            (employee) => employee.id === id
          );

          return (
            <a
              key={id}
              className="thumb"
              data-id={id}
              onClick={(e) => {
                e.preventDefault();
                const selectedId = e.currentTarget.getAttribute("data-id");

                if (selectedId === randomEmployee.id) {
                  setMarkState({ id: selectedId, result: "correct" });
                  setScore((prevScore) => prevScore + 1); // Increment score on correct match
                  console.log("Correct! Current score:", score + 1);
                } else {
                  setMarkState({ id: selectedId, result: "incorrect" });
                  console.log("Incorrect! Current score:", score); // In this case, the game ends, so we don't increment the score
                  setTimeout(() => {
                    // Redirect to game over page after a short delay
                    navigate("/game-over", {
                      state: { score: score }, // Pass the current score to the game over page
                    });
                  }, 5000); // Redirect after x seconds
                }
              }}>
              {/* Display correct or incorrect mark only for the clicked thumb */}
              {markState.id === id && markState.result === "correct" && (
                <div className="correctMark">
                  <img src={correctMark} alt="Correct!" />
                </div>
              )}
              {markState.id === id && markState.result === "incorrect" && (
                <div className="incorrectMark">
                  <img src={incorrectMark} alt="Incorrect" />
                </div>
              )}

              <img
                style={{
                  width: "260px",
                  height: "260px",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage: `url(${
                    employeeInfo?.headshot?.url ||
                    `https://ui-avatars.com/api/?name=${employeeInfo?.firstName}+${employeeInfo?.lastName}&size=260`
                  })`,
                  filter:
                    markState.result === "incorrect" ? "grayScale(100%)" : "",
                }}
                src={spacerGif}
                alt={employeeInfo?.firstName || "Employee Name"}
              />

              <p>{employeeInfo?.firstName || "Employee Name"}</p>
            </a>
          );
        })}
      </div>
      <div className="card">
        <Link
          to="/game-loop"
          aria-label="Continue the game"
          onClick={() => {
            setMarkState({ id: null, result: null }); // Reset the mark state for the next round
            setRandomEmployeeIds(getRandomIds([...employeeData], 6)); // Get new random IDs for the next round
            setRandomEmployee({ id: "" }); // Reset the random employee
            console.log("Continuing to the next round. Current score:", score);
          }}
          className="inline-block w-md
            text-white bg-blue-800 hover:bg-blue-700
            rounded-md px-3 py-2
            disabled:border-gray-200 disabled:bg-gray-500 disabled:text-gray-50 disabled:cursor-not-allowed"
          disabled={markState.result === "incorrect"} // Disable button when a thumb is incorrect, will redirect to game over page
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default GameLoop;
