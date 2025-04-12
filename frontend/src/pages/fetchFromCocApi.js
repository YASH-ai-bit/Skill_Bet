const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

export const fetchWarDestruction = async (clanTag, warIndex = 1) => {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/api/coc/warlog/${clanTag}`);
  
    if (!res.ok) throw new Error('Failed to fetch war log');
  
    const data = await res.json();
    const war = data.items[warIndex];
  
    return {
      clanDestruction: Math.floor(war?.clan?.destructionPercentage),
      opponentDestruction: Math.floor(war?.opponent?.destructionPercentage),
      clanName: war?.clan?.name,
      opponentName: war?.opponent?.name
    };
  };
  