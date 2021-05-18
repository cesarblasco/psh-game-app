const apiUrl = "http://localhost:3333";

export const fetchTopPlayersList = async () => {
  return await fetch(`${apiUrl}/top-players`)
    .then((response) => response.json())
    .then(async (userJsonResponse) => {
      return userJsonResponse;
    })
    .catch((e) => {
      throw e;
    });
};

export const fetchLastReportUpdateTime = async () => {
  return await fetch(`${apiUrl}/last-report-time`)
    .then((response) => response.json())
    .then(async (jsonResponse) => {
      return jsonResponse;
    })
    .catch((e) => {
      throw e;
    });
};

export const requestCsvExport = async () => {
  return await fetch(`${apiUrl}/export-top-players`)
    .then((response) => response.json())
    .then(async (jsonResponse) => {
      return jsonResponse;
    })
    .catch((e) => {
      throw e;
    });
};
