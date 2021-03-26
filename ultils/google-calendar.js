/* eslint-disable camelcase */

const axios = require('axios');
module.exports.getListRoom = async (token, page) => {
  const response = await axios({
    method: 'get',
    url: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  let resultData = response.data.items.filter(item => item.summary.includes('R'));

  resultData = resultData.map((item) => {
    return {
      id: item.id,
      title: item.summary,
      description: item.description,
      backgroundColor: item.backgroundColor
    };
  });
  page = page || 1;
  const per_page = 10;
  const offset = (page - 1) * per_page;
  const paginatedItems = resultData.slice(offset).slice(0, per_page);
  const total_pages = Math.ceil(resultData.length / per_page);
  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: (total_pages > page) ? page + 1 : null,
    total: resultData.length,
    total_pages: total_pages,
    data: paginatedItems
  };
};
module.exports.removeRoom = async (token, id) => {
  const response = await axios({
    method: 'delete',
    url: `https://www.googleapis.com/calendar/v3/users/me/calendarList/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).catch(
    function (error) {
      return Promise.reject(error);
    }
  );
  return response;
};
module.exports.addRoom = async (token, content) => {
  const result = await axios({
    method: 'post',
    url: 'https://www.googleapis.com/calendar/v3/calendars',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: content

  });
  return result.data;
};
module.exports.updateRoom = async (token, id, content) => {
  const result = await axios({
    method: 'put',
    url: `https://www.googleapis.com/calendar/v3/calendars/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: content
  });
  return result.data;
};
