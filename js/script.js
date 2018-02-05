function getValues(el, array){
  el.parent().wrap('<form></form>');
  array.push(el.parents('form').serializeArray());
  $(el).parent().unwrap();
  return array;
}
function getDataFromArrayOfObjects(array){
  var newArray = [];
  $.each(array, function(){
    var newObj = {};
    //console.log(this);
    $.each(this, function(){
      newObj[this.name] = this.value;
    });
    newArray.push(newObj);
  });
  return newArray;
}
$(document).ready(function(){
  $('button[type="submit"]').click(function(e){
    e.preventDefault();
    var tabPaneActive = $('.tab-pane');//all tabs
    //var tabPaneActive = $('.tab-pane.active');//just active tab
    //console.log(tabPaneActive);
    //console.log(tabPaneActive.find('input[type="hidden"]').length);
    var hiddens = tabPaneActive.find('input[type="hidden"]');
    var values=[];
    var array_childrens = [];
    var array_sub_childrens = [];
    var array_lines = [];
    var arrayOfObjects = [];
    if(hiddens.length > 1){
      $.each(hiddens, function(i){
        //belonging to same tab-pane
        var childrens = $(this).parents('.tab-pane table tbody').children();
        if(childrens.length > 1){
            getValues($(this), array_sub_childrens);
        }
        else{
          getValues($(this), values);
        }
      });
    }

    array_childrens.push(array_sub_childrens);

    if(array_sub_childrens.length > 0)
      values.push(array_childrens);

    $.each(values, function(){
      var array_values = [];
      var obj = {};
      var obj2 = {};
      $.each(this, function(){
        if(!$.isArray(this)){
          //is object
          obj[this.name] = this.value;
        }
        else {
          //is array of objects
          arrayOfObjects = getDataFromArrayOfObjects(this);
        }
      });

      array_values.push(obj);
      if(array_values.length > 0)
      array_lines.push(array_values);
      console.log(arrayOfObjects.length);
      if(arrayOfObjects.length > 0)
      array_lines.push(arrayOfObjects);

    });
    console.log(JSON.stringify(array_lines));

  });

  $('button[type="button"]').click(function(e){
    e.preventDefault();
    var tr = $(this).parents('.tab-pane').find('table tbody tr').last();
    tr_clone = tr.clone();
    var idTr = Number($(tr_clone).find('input[type="hidden"]').val()) + 1;
    $(tr_clone).find('input[type="hidden"]').val(idTr);
    tr.parent().append(tr_clone);
  });
});
