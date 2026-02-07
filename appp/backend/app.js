function Riskcalculator(dia, dis)
{
    const rawdata=(dia/dis)*1000000;
    const statusValue=Math.min(Math.max(rawdata,1),100);
    return Math.round(statusValue);
}
