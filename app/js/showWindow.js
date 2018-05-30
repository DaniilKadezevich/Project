'use strict';
let showWindow = (item) => {
  $('#fastQuantity').attr('value', 0);
  $("#fastPhoto").attr('src', item.images[0]);
  $("#fastTitle").html(item.title);
  $('#colorChange').html('');
  item.colors.forEach((elem)=>{
    let option = document.createElement("option");
    $(option).text(elem);
    $('#colorChange').append(option);
  });
  $('#colorChange').on('change', ()=>{
    item.colors.forEach((color, ind)=>{
      if(color===$('#colorChange')[0].value) {
        $("#fastPhoto").attr('src', item.images[ind]);
      }
    });
  });
  if($(mainMenu[0].lastChild).hasClass('innerBtn')) {
    let price = item.price*0.9;
    $("#fastPrice").html(`${price} грн.`);
  } else {
    $("#fastPrice").html(`${item.price} грн.`);

  }
  this.availability = item.characteristics.availability;
  this.value = 0;
  $("#fastQuantity").prop("disabled", true);
  $('#fastPlus').on('click', (e)=> {
    e.stopImmediatePropagation();
    plusFastQuantity ();

  });
  $('#fastMinus').on('click', (e)=>{
    e.stopImmediatePropagation();
    minusFastQuantity();
  });

};
let plusFastQuantity = () =>{
  ++this.value;
  if(this.value>this.availability) {
    this.value=this.availability;
  }
  $('#fastQuantity').attr('value', this.value);
};
let minusFastQuantity = () => {
  --this.value;
  if(this.value<0) {
    this.value=0;
  }
  $('#fastQuantity').attr('value', this.value);
};