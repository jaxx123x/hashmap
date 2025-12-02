

function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
}



class HashMap {
    constructor(capacity = 16) {
        this.buckets = new Array(capacity);
        this.capacity = capacity;
        this.count = 0;
        this.maxLoadFactor = capacity * 0.75;
    }

    set(key, value, skipResize = false) {
          
        

        const fKey = hash(key) % this.capacity;
        
        if (this.buckets[fKey] === undefined) {
            this.buckets[fKey] = [];
            this.buckets[fKey].push({ key: key, value: value });
            this.count++;
            
        }
        else if (this.buckets[fKey] !== undefined) {
           let count = 0;
            for (let i = 0; i < this.buckets[fKey].length; i++) {
                
                if (this.buckets[fKey][i].key === key) {
                    this.buckets[fKey][i].value = value;
                    
                }
                else {
                    count++;
                }
                if (count === this.buckets[fKey].length) {
                    this.buckets[fKey].push({key: key, value: value});
                    this.count++;
                }
            }
        }
        
        if (!skipResize && this.count > this.maxLoadFactor) {
            this.checkMaxCapacity();
        }
        
        
        
    }

    

      checkMaxCapacity() {
        const count = this.count;
        const maxLoadFactor = this.maxLoadFactor;

        if (count > maxLoadFactor) {
            const entries = this.entries();
            this.clear();
            this.capacity = this.capacity * 2;
            this.count = 0;
            this.maxLoadFactor = this.capacity * 0.75;          
            entries.forEach(element => {
                this.set(element.key, element.value, true);
            });
        }
        
    };
        

    get(key) {
        const fKey = hash(key) % this.capacity;
        const entry = this.buckets[fKey];
        if (entry && this.buckets[fKey].key === key) {
            return this.buckets[fKey].value;
        }
        return null;
    }

    has(key) {
        const fKey = hash(key) % this.capacity;
        const bucket = this.buckets[fKey];

        if(!bucket) return false;
        
        for (let i = 0; i < bucket.length; i++) {
            if(bucket[i].key === key) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    remove(key) {
        const fKey = hash(key) % this.capacity;
        const bucket = this.buckets[fKey];
        if (!bucket) return false;

        for (let i = 0; i < bucket.length; i++) {
            if(bucket[i].key === key) {
                bucket.splice(i, 1);
                return true;
            }
        }
        
    }

    length() {
        let count = 0;
        for (let i = 0; i < this.capacity; i++) {
            if (this.buckets[i] !== undefined) {
                count++
            }
        }
        return count;
    }

    clear() {
        for (let i = 0; i < this.capacity; i++) {
            if (this.buckets[i] !== undefined) {
                this.buckets[i] = undefined;
            }
        }
    }

    keys() {
        const newArray =[];
        this.buckets.forEach(bucket => {
            if(bucket) {
                bucket.forEach(entry => {
                    newArray.push(entry.key);
                });
            }
        });
        return newArray;
    }

    values() {
        const newArray = [];
        this.buckets.forEach(bucket => {
            if(bucket) {
                bucket.forEach(entry => {
                    newArray.push(entry.value);
                });
            }
        });
        return newArray;
    }

    entries() {
       
            
        const newArray = [];
        this.buckets.forEach(bucket => {
            if(bucket) {
                bucket.forEach(entry => {
                    newArray.push(entry);
                });
            }
        });

        return newArray;
    }

}

const test = new HashMap(16);




test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')



console.log(test);

test.set('moon', 'silver');
console.log(test);


