export const numify = (num: number) => {
    num = Number(num.toString().replace(/[^0-9.]/g, ""));
    if (num < 1000) return num;

    let si = [
        { v: 1e3, s: "k" },
        { v: 1e6, s: "M" },
        { v: 1e9, s: "B" },
        { v: 1e12, s: "T" },
        { v: 1e15, s: "P" },
        { v: 1e18, s: "E" },
    ];

    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    const result: string = ((num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s).toString();
    return result;
}