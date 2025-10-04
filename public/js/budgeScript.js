const selectCategory = document.getElementById('selectCategory');
const category = document.getElementById('category');

selectCategory.addEventListener('click', function(){
console.log(this.value);
category.value = this.value;
})