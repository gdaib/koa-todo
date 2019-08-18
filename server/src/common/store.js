class Store {
  // 分钟
  constructor(prefix, minute = 10) {
    this.store = {};
    this.prefix = prefix;
    this.expireTime = minute * 60 * 1000;
  }

  set(key, value) {

    this.store[`${this.prefix}_${key}`] = {
      data: { ...value },
      expireTime: Date.now() + this.expireTime // 加上过期时间等于有效时间
    };
 
    return true;
  }

  get(key) {
    const _key = `${this.prefix}_${key}`;

    const value = this.store[_key];
    if (!value) return null;

    const { data, expireTime } = value;

    // 取出的时候发现过期了
    if (Date.now() > expireTime) {
      delete this.store[_key];
      return null;
    }

    return data;
  }
  
  remove(key) {
    const _key = `${this.prefix}_${key}`;

    delete this.store[_key];

    return true
  }
}

module.exports = Store;
