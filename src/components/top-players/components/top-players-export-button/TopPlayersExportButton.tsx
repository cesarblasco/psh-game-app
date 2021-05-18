import { requestCsvExport } from "../../services/PlayersService";
import { ToastContainer, toast } from "react-toastify";
import "./TopPlayersExportButton.css";
import "react-toastify/dist/ReactToastify.css";

const PlayersListExportButton: React.FC = () => {
  const exportPlayersListToCSV = async () => {
    try {
      const response = await requestCsvExport();

      const link = document.createElement("a");
      link.href = response.file_url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      toast.error("Error while generating report, please try again later");
    } finally {
      toast.success("Report generated correctly and downloaded!");
    }
  };

  return (
    <div className="export-btn-container">
      <ToastContainer autoClose={3000} />
      <button className="export-btn" onClick={() => exportPlayersListToCSV()}>
        Export to CSV
      </button>
    </div>
  );
};

export default PlayersListExportButton;
