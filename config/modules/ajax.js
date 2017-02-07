'use strict';

let ajaxConfig = (() => {
  let ajaxConfig = {
    error(jqXHR, textStatus, errorThrown) {
      console.log('error')
    }
  };

  $.ajaxSetup(ajaxConfig);

  return ajaxConfig;
})();

export default ajaxConfig;
