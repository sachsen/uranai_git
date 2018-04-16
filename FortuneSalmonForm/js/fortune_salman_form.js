function formIsValid() {
  var is_valid = true;
  var list = ["family_name", "name", "birth_day"]
  for (var i of list) {
    if ($("input[name=" + i + "]").val()) {
      $("#" + i).removeClass("alert-danger");
      $("#" + i + "_error").hide();
    }
    else {
      $("#" + i).addClass("alert-danger");
      $("#" + i + "_error").show();
      is_valid = false;
    }
  }
  if ($("input[name=fortune_telling_names]:checked").length) {
    $("#fortune_telling_names").removeClass("alert-danger");
    $("#fortune_telling_names_error").hide();
  }
  else {
    $("#fortune_telling_names").addClass("alert-danger");
    $("#fortune_telling_names_error").show();
    is_valid = false;
  }
  return is_valid;
}

function ajaxGet(parameter) {
  var url = getHostAndPort() + "/api/create.json?" + parameter;
  console.log(url);
  var error = false;
  $.ajax({
    type: 'get',
    scriptCharset: 'utf-8',
    dataType: 'json',
    url: url
  }).done(function (json, status, xhr) {
    if (json["status"] == "success") {
      var id = json["data"]["id"];
      console.log(id);
      printFortuneTelling(id);
      error = false;
    }
    else {
      console.log("エラーが発生しました");
      console.log(json);
      error = true;
    }
  }).fail(function (xhr, status, err) {
    console.log("通信エラーが発生しました");
    console.log(xhr);
    error = true;
  });
  return !error;
}

function postFortunetelling() {
  var $objects = $("input[name=fortune_telling_names]:checked");
  var family_name = $("input[name=family_name]").val();
  var name = $("input[name=name]").val();
  var date = $("input[name=birth_day]").val().split("-");
  if (formIsValid()) {
    for (var i = 0; i < $objects.length; i++) {
      var $obj = $($objects[i]);
      var fortune_telling_name = $obj.val();
      var parameter = "family_name=" + family_name + "&name=" + name + "&year=" + date[0] + "&month=" + date[1] + "&date=" + date[2] + "&" + fortune_telling_name + "=1"
      var res = ajaxGet(parameter);
      if (!res) {
        alert("エラーが発生しました");
        return false;
      }
    }
    $("#form").hide();
    $("#explain").hide();
    $("#submit").show();
    return false;
  }
  else {
    return false;
  }
}

function renderFortuneTelling() {
  var url = getHostAndPort() + "/api/get_workers.json";
  console.log(url);
  $.ajax({
    type: 'get',
    scriptCharset: 'utf-8',
    dataType: 'json',
    url: url
  }).done(function (json, status, xhr) {
    var workers = json["workers"];
    var li_souce = ""
    for (var i = 0; i < workers.length; i++) {
      if (workers[i]["display_to_client"]) {
        var name = workers[i]["name"];
        var description = workers[i]["description"];
        li_souce += '<li><label for="' + name + '" class="checkbox"><input name="fortune_telling_names" id="' + name + '" value="' + name + '" type="checkbox" /><label for="' + name + '">' + description + '</label></li>';
      }
    }
    $("#fortune_telling_names").children("td").children("ul").html(li_souce);
  }).fail(function (xhr, status, err) {
    alert("通信エラーが発生しました");
    console.log(xhr);
  });
}

function printFortuneTelling(id) {
  var url = getHostAndPort() + "/api/exec.json?id=" + id;
  console.log(url);
  $.ajax({
    type: 'get',
    scriptCharset: 'utf-8',
    dataType: 'json',
    url: url
  }).done(function (json, status, xhr) {
    if (json["status"] != "success") {
      alert("エラーが発生しました");
    }
  }).fail(function (xhr, status, err) {
    alert("通信エラーが発生しました");
    console.log(xhr);
  });
}

function getSearchParameters() {
  var prmstr = window.location.search.substr(1);
  return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray(prmstr) {
  var params = {};
  var prmarr = prmstr.split("&");
  for (var i = 0; i < prmarr.length; i++) {
    var tmparr = prmarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
  }
  return params;
}

function getHostAndPort() {
  var protocol = "http";
  var host = "192.168.10.3";
  var port = "8080";
  var params = getSearchParameters();
  if (params['PROTOCOL']) {
    protocol = params['PROTOCOL'];
  }
  if (params['HOST']) {
    host = params['HOST'];
  }
  if (params['PORT']) {
    port = params['PORT'];
  }
  return protocol + "://" + host + ":" + port;
}
