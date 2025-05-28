export function requiredRule(value) {
  return !!value || 'این فیلد الزامی است'
}

export function passwordRule (value) {
  return value.length > 8 || 'رمزعبور باید بیشتر از ۸ کاراکتر باشد'
}