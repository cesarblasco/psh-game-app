import React from "react";
import { IPlayer } from "../../../../models/Player";
import { getFormattedDate } from "../../../../utils/utils";
import "./TopPlayersTable.css";

interface IProps {
  topPlayers: IPlayer[];
}

const TopPlayersTable: React.FC<IProps> = ({ topPlayers }) => {
  const renderDate = (unformattedDate: string): JSX.Element => {
    return <>{getFormattedDate(unformattedDate)}</>;
  };

  return (
    <>
      <table className="top-players-table">
        <thead>
          <tr>
            <th>Place</th>
            <th>Id</th>
            <th>Avatar</th>
            <th>Nickname</th>
            <th>Player Id</th>
            <th>Score</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>
          {topPlayers && topPlayers.length ? (
            <>
              {topPlayers.map((player: any, index: number) => {
                return (
                  <tr key={player.id}>
                    <td>#{index + 1}</td>
                    <td>{player.id}</td>
                    <td>
                      <img
                        className="border-radius-100"
                        src={player.avatar_url}
                        width={50}
                        height={50}
                      ></img>
                    </td>
                    <td>{player.nickname}</td>
                    <td>{player.player_id}</td>
                    <td>{player.score} points</td>
                    <td>{renderDate(player.created_at)}</td>
                  </tr>
                );
              })}
            </>
          ) : (
            <>
              <tr>
                <td className="no-data-available-row" colSpan={7}>
                  No data available, make sure the server is running and
                  generating data (generated every 5 minutes)
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TopPlayersTable;
