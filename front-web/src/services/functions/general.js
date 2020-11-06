export const functionAfterTime = (seconds, callback) => {
    setTimeout(() => {
        callback()
    }, seconds);
}