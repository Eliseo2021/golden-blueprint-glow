export type Team = {
  id: number;
  name: string;
  code: string;
  flag: string;
  group: string;
  confederation: string;
  fifaRank: number;
  strength: number;
  championOdds: number;
};

export const worldCup2026Teams: Team[] = [
  { id: 1, name: "México", code: "mx", flag: "🇲🇽", group: "A", confederation: "CONCACAF", fifaRank: 17, strength: 82, championOdds: 1.2 },
  { id: 2, name: "Sudáfrica", code: "za", flag: "🇿🇦", group: "A", confederation: "CAF", fifaRank: 56, strength: 69, championOdds: 0.1 },
  { id: 3, name: "Corea del Sur", code: "kr", flag: "🇰🇷", group: "A", confederation: "AFC", fifaRank: 23, strength: 80, championOdds: 0.5 },
  { id: 4, name: "República Checa", code: "cz", flag: "🇨🇿", group: "A", confederation: "UEFA", fifaRank: 39, strength: 76, championOdds: 0.2 },
  { id: 5, name: "Canadá", code: "ca", flag: "🇨🇦", group: "B", confederation: "CONCACAF", fifaRank: 30, strength: 79, championOdds: 0.4 },
  { id: 6, name: "Bosnia y Herzegovina", code: "ba", flag: "🇧🇦", group: "B", confederation: "UEFA", fifaRank: 74, strength: 67, championOdds: 0.1 },
  { id: 7, name: "Qatar", code: "qa", flag: "🇶🇦", group: "B", confederation: "AFC", fifaRank: 53, strength: 71, championOdds: 0.1 },
  { id: 8, name: "Suiza", code: "ch", flag: "🇨🇭", group: "B", confederation: "UEFA", fifaRank: 20, strength: 83, championOdds: 0.6 },
  { id: 9, name: "Brasil", code: "br", flag: "🇧🇷", group: "C", confederation: "CONMEBOL", fifaRank: 5, strength: 95, championOdds: 12.0 },
  { id: 10, name: "Marruecos", code: "ma", flag: "🇲🇦", group: "C", confederation: "CAF", fifaRank: 12, strength: 88, championOdds: 2.0 },
  { id: 11, name: "Haití", code: "ht", flag: "🇭🇹", group: "C", confederation: "CONCACAF", fifaRank: 83, strength: 63, championOdds: 0.0 },
  { id: 12, name: "Escocia", code: "gb-sct", flag: "🏴", group: "C", confederation: "UEFA", fifaRank: 45, strength: 74, championOdds: 0.2 },
  { id: 13, name: "Estados Unidos", code: "us", flag: "🇺🇸", group: "D", confederation: "CONCACAF", fifaRank: 16, strength: 84, championOdds: 1.0 },
  { id: 14, name: "Paraguay", code: "py", flag: "🇵🇾", group: "D", confederation: "CONMEBOL", fifaRank: 48, strength: 73, championOdds: 0.1 },
  { id: 15, name: "Australia", code: "au", flag: "🇦🇺", group: "D", confederation: "AFC", fifaRank: 24, strength: 79, championOdds: 0.3 },
  { id: 16, name: "Turquía", code: "tr", flag: "🇹🇷", group: "D", confederation: "UEFA", fifaRank: 27, strength: 81, championOdds: 0.5 },
  { id: 17, name: "Alemania", code: "de", flag: "🇩🇪", group: "E", confederation: "UEFA", fifaRank: 10, strength: 91, championOdds: 6.0 },
  { id: 18, name: "Curazao", code: "cw", flag: "🇨🇼", group: "E", confederation: "CONCACAF", fifaRank: 90, strength: 62, championOdds: 0.0 },
  { id: 19, name: "Costa de Marfil", code: "ci", flag: "🇨🇮", group: "E", confederation: "CAF", fifaRank: 37, strength: 77, championOdds: 0.2 },
  { id: 20, name: "Ecuador", code: "ec", flag: "🇪🇨", group: "E", confederation: "CONMEBOL", fifaRank: 25, strength: 80, championOdds: 0.5 },
  { id: 21, name: "Países Bajos", code: "nl", flag: "🇳🇱", group: "F", confederation: "UEFA", fifaRank: 7, strength: 92, championOdds: 7.0 },
  { id: 22, name: "Japón", code: "jp", flag: "🇯🇵", group: "F", confederation: "AFC", fifaRank: 15, strength: 85, championOdds: 1.5 },
  { id: 23, name: "Suecia", code: "se", flag: "🇸🇪", group: "F", confederation: "UEFA", fifaRank: 28, strength: 80, championOdds: 0.4 },
  { id: 24, name: "Túnez", code: "tn", flag: "🇹🇳", group: "F", confederation: "CAF", fifaRank: 41, strength: 75, championOdds: 0.1 },
  { id: 25, name: "Bélgica", code: "be", flag: "🇧🇪", group: "G", confederation: "UEFA", fifaRank: 8, strength: 91, championOdds: 5.0 },
  { id: 26, name: "Egipto", code: "eg", flag: "🇪🇬", group: "G", confederation: "CAF", fifaRank: 34, strength: 78, championOdds: 0.2 },
  { id: 27, name: "Irán", code: "ir", flag: "🇮🇷", group: "G", confederation: "AFC", fifaRank: 19, strength: 83, championOdds: 0.5 },
  { id: 28, name: "Nueva Zelanda", code: "nz", flag: "🇳🇿", group: "G", confederation: "OFC", fifaRank: 89, strength: 63, championOdds: 0.0 },
  { id: 29, name: "España", code: "es", flag: "🇪🇸", group: "H", confederation: "UEFA", fifaRank: 2, strength: 97, championOdds: 16.0 },
  { id: 30, name: "Cabo Verde", code: "cv", flag: "🇨🇻", group: "H", confederation: "CAF", fifaRank: 72, strength: 68, championOdds: 0.1 },
  { id: 31, name: "Arabia Saudita", code: "sa", flag: "🇸🇦", group: "H", confederation: "AFC", fifaRank: 58, strength: 70, championOdds: 0.1 },
  { id: 32, name: "Uruguay", code: "uy", flag: "🇺🇾", group: "H", confederation: "CONMEBOL", fifaRank: 11, strength: 89, championOdds: 3.0 },
  { id: 33, name: "Francia", code: "fr", flag: "🇫🇷", group: "I", confederation: "UEFA", fifaRank: 3, strength: 96, championOdds: 15.0 },
  { id: 34, name: "Senegal", code: "sn", flag: "🇸🇳", group: "I", confederation: "CAF", fifaRank: 18, strength: 84, championOdds: 0.8 },
  { id: 35, name: "Irak", code: "iq", flag: "🇮🇶", group: "I", confederation: "AFC", fifaRank: 60, strength: 70, championOdds: 0.1 },
  { id: 36, name: "Noruega", code: "no", flag: "🇳🇴", group: "I", confederation: "UEFA", fifaRank: 14, strength: 86, championOdds: 1.5 },
  { id: 37, name: "Argentina", code: "ar", flag: "🇦🇷", group: "J", confederation: "CONMEBOL", fifaRank: 1, strength: 98, championOdds: 18.0 },
  { id: 38, name: "Argelia", code: "dz", flag: "🇩🇿", group: "J", confederation: "CAF", fifaRank: 36, strength: 77, championOdds: 0.2 },
  { id: 39, name: "Austria", code: "at", flag: "🇦🇹", group: "J", confederation: "UEFA", fifaRank: 22, strength: 82, championOdds: 0.8 },
  { id: 40, name: "Jordania", code: "jo", flag: "🇯🇴", group: "J", confederation: "AFC", fifaRank: 64, strength: 69, championOdds: 0.1 },
  { id: 41, name: "Portugal", code: "pt", flag: "🇵🇹", group: "K", confederation: "UEFA", fifaRank: 6, strength: 93, championOdds: 8.0 },
  { id: 42, name: "RD Congo", code: "cd", flag: "🇨🇩", group: "K", confederation: "CAF", fifaRank: 57, strength: 71, championOdds: 0.1 },
  { id: 43, name: "Uzbekistán", code: "uz", flag: "🇺🇿", group: "K", confederation: "AFC", fifaRank: 55, strength: 72, championOdds: 0.1 },
  { id: 44, name: "Colombia", code: "co", flag: "🇨🇴", group: "K", confederation: "CONMEBOL", fifaRank: 9, strength: 90, championOdds: 4.0 },
  { id: 45, name: "Inglaterra", code: "gb-eng", flag: "🏴", group: "L", confederation: "UEFA", fifaRank: 4, strength: 95, championOdds: 11.0 },
  { id: 46, name: "Croacia", code: "hr", flag: "🇭🇷", group: "L", confederation: "UEFA", fifaRank: 13, strength: 87, championOdds: 2.0 },
  { id: 47, name: "Ghana", code: "gh", flag: "🇬🇭", group: "L", confederation: "CAF", fifaRank: 43, strength: 75, championOdds: 0.1 },
  { id: 48, name: "Panamá", code: "pa", flag: "🇵🇦", group: "L", confederation: "CONCACAF", fifaRank: 35, strength: 77, championOdds: 0.2 },
];

export function getInitials(name: string): string {
  const cleaned = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
  const words = cleaned.split(/\s+/).filter((w) => w.length > 1 && !["DE", "DEL", "LA", "EL", "Y"].includes(w));
  if (words.length === 1) return words[0].slice(0, 3);
  if (words.length >= 2) return (words[0][0] + words[1][0] + (words[1][1] || words[0][1] || "")).slice(0, 3);
  return cleaned.replace(/\s+/g, "").slice(0, 3);
}
