import { axiosInstance as axios } from '../../../common/axios';
import { stripComments } from 'jsonc-parser';
import { updateHistory } from '../../../lib/update-history';
import { bigIntJSON } from '../../../common/bigIntJSON';

export function requestFromCode(text, withHistory = true) {
  const data = codeParse(text);
  if (data.error) {
    return data;
  } else {
    // Sending request

    return axios({
      method: data.method,
      url: data.endpoint,
      data: data.reqBody,
    })
      .then((response) => {
        if (withHistory) updateHistory(data);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return err.response?.data?.status ? err.response?.data?.status : err;
      });
  }
}

export function codeParse(codeText) {
  const codeArray = codeText.split(/\r?\n/);
  let headerLine = codeArray.shift();
  // Remove possible comments
  headerLine = headerLine.replace(/\/\/.*$/gm, '');
  const body = codeArray.join('\n');
  // Extract the header
  const method = headerLine.split(' ')[0];
  const endpoint = headerLine.split(' ')[1];

  let reqBody = {};
  if (body) {
    try {
      reqBody = body === '\n' ? {} : bigIntJSON.parse(stripComments(body));
    } catch (e) {
      return {
        method: null,
        endpoint: null,
        reqBody: null,
        error: 'JSON\'u çalıştırmak ve kontrol etmek için konum parantezlerini düzeltin',
      };
    }
  }
  if (method === '' && endpoint === '') {
    return {
      method: null,
      endpoint: null,
      reqBody: reqBody,
      error: 'Başlık ekleyin veya json ile başlık arasındaki satır boşluğunu kaldırın (varsa)',
    };
  } else if (method === '') {
    return {
      method: null,
      endpoint: endpoint,
      reqBody: reqBody,
      error: 'HTTP yöntemi ekleyin',
    };
  } else if (endpoint === '') {
    return {
      method: method,
      endpoint: null,
      reqBody: reqBody,
      error: 'Uç nokta ekleyin',
    };
  } else {
    return {
      method: method,
      endpoint: endpoint,
      reqBody: reqBody,
      error: null,
    };
  }
}
