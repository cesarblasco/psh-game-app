import React, { useState, useEffect } from "react";
import TopPlayersTable from "./components/top-players-table/TopPlayersTable";
import TopPlayersExportButton from "./components/top-players-export-button/TopPlayersExportButton";
import {
  fetchTopPlayersList,
  fetchLastReportUpdateTime,
} from "./services/PlayersService";
import { IPlayer } from "../../models/Player";
import { getFormattedDate } from "../../utils/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TopPlayers.css";

const TopPlayers: React.FC = () => {
  const [topPlayers, setTopPlayers] = useState<IPlayer[]>([]);
  const [lastReportUpdateTime, setLastReportUpdateTime] = useState<{
    created_at: string;
  }>({ created_at: "" });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleFetchLastReportUpdateTime = async () => {
    try {
      const lastUpdateTime = await fetchLastReportUpdateTime();
      setLastReportUpdateTime(lastUpdateTime);
    } catch (e) {}
  };

  const handleFetchTopPlayersList = async () => {
    try {
      const topPlayersList = await fetchTopPlayersList();
      setTopPlayers(topPlayersList);
    } catch (e) {
      toast.error(
        "Could not fetch data, make sure the server is running or try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchTopPlayersList();
    handleFetchLastReportUpdateTime();

    setInterval(() => {
      setTopPlayers([]);
      handleFetchTopPlayersList();
      handleFetchLastReportUpdateTime();
    }, 10000);
  }, []);

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div className="text-align-center">
        <h1>PSH GAME TOP 10 PLAYERS</h1>
      </div>

      {!isLoading ? (
        <>
          <div className="container">
            <div className="table-container">
              {lastReportUpdateTime.created_at ? (
                <p className="text-align-center">
                  Last report generated at:{" "}
                  <span className="font-weight-bold">
                    {getFormattedDate(lastReportUpdateTime.created_at)}
                  </span>
                </p>
              ) : null}

              <TopPlayersTable topPlayers={topPlayers} />
            </div>

            {topPlayers.length ? <TopPlayersExportButton /> : null}
          </div>
        </>
      ) : (
        <p>LOADING...</p>
      )}
    </>
  );
};

export default TopPlayers;
