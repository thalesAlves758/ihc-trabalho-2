function getPropertyFromSessionStorage(key, defaultValue) {
  return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : defaultValue;
}

function savePropertyInSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function getStarsElementsByRating(rating) {
  const filledStarSvg = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#EAC452">
      <path d="M236.5-125 301-402 86-588l283.5-24.5 110.5-261 110.5 261L874-588 659-402l64.5 277L480-272 236.5-125Z"/>
    </svg>`;
  const semiFilledStarSvg = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#EAC452">
      <path d="m606-286-33-144 111-96-146-13-58-136v312l126 77ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
    </svg>`;
  const emptyStarSvg = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#EAC452">
      <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
    </svg>`;

  const filledStars = parseInt(rating);
  const semiFilledStars = (rating - filledStars) >= 0.5 ? 1 : 0;
  const emptyStars = parseInt(5 - filledStars - semiFilledStars);

  return [
    ...Array(filledStars).fill(filledStarSvg),
    ...Array(semiFilledStars).fill(semiFilledStarSvg),
    ...Array(emptyStars).fill(emptyStarSvg)
  ].join('');
}
