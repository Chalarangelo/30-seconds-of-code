import sift from './index.d'

sift({ $exists:true}, ['craig',null]); //['craig']
var siftExists = sift({$exists:true});

siftExists('craig'); //true
siftExists(null); //false
['craig', null].filter(siftExists); //['craig']

var sifter = sift({$exists:true}, function(user) {
	return !!user.name;
});


sifter([
	{
		name: "Craig"
	},
	{
		name: null
	}
])

siftExists(null); //false
siftExists('craig'); //true

sift({  $in: ['Costa Rica','Brazil'] }, ['Brazil','Haiti','Peru','Chile']);

sift({ location: { $in: ['Costa Rica','Brazil'] } }, [ { name: 'Craig', location: 'Brazil' } ]);

sift({ $nin: ['Costa Rica','Brazil'] }, ['Brazil','Haiti','Peru','Chile']);

sift({ $exists: true }, ['Craig',null,'Tim']);

sift({ city: { $exists: false } }, <{name: string, city?: string}[]>[ { name: 'Craig', city: 'Minneapolis' }, { name: 'Tim' }]);

sift({ $gte: 6 }, [0, 1, 2, 3]);

sift({ $gt: 2 }, [0, 1, 2, 3]);

sift({ $lte: 2 }, [0, 1, 2, 3]);

sift({ $lt: 2 }, [0, 1, 2, 3]);

sift({  state: {  $eq: 'MN' }}, [{ state: 'MN' }, { state: 'CA' }, { state: 'WI' }]);

sift({ state: 'MN' }, [{ state: 'MN' }, { state: 'CA' }, { state: 'WI' }]);

sift({ state: {$ne: 'MN' }}, [{ state: 'MN' }, { state: 'CA' }, { state: 'WI' }]);

sift({ $mod: [3, 0] }, [100, 200, 300, 400, 500, 600]);

sift({ tags: { $all: [ 'books','programming'] }}, [
{ tags: ['books','programming','travel' ] },
{ tags: ['travel','cooking'] } ]);

sift({ $and: [ {  name: 'Craig'  }, { state: 'MN' } ] }, [
{ name: 'Craig', state: 'MN' },
{ name: 'Tim', state: 'MN' },
{ name: 'Joe', state: 'CA' } ]);

sift({ $or: [ { name: 'Craig' }, { state: 'MN' } ] }, [
{ name: 'Craig', state: 'MN' },
{ name: 'Tim', state: 'MN' },
{ name: 'Joe', state: 'CA' } ]);

sift({ $nor: [ {  name: 'Craig'  }, { state: 'MN' } ] }, [
{ name: 'Craig', state: 'MN' },
{ name: 'Tim', state: 'MN' },
{ name: 'Joe', state: 'CA' } ]);

sift({ tags: { $size: 2 } }, [ { tags: ['food','cooking'] }, { tags: ['traveling'] }]);

sift({ $type: Date }, [new Date(), 4342, 'hello world']); //returns single date
sift({ $type: String }, [new Date(), 4342, 'hello world']); //returns ['hello world']

sift({ $regex: /^f/i, $nin: ["frank"] }, ["frank", "fred", "sam", "frost"]); // ["fred", "frost"]
sift({ $regex: "^f", $options: "i", $nin: ["frank"] }, ["frank", "fred", "sam", "frost"]); // ["fred", "frost"]

sift({  $where: "this.name === 'frank'" }, [{name:'frank'},{name:'joe'}]); // ["frank"]
sift({
	$where: function() {
		return this.name === "frank"
	}
}, [{name:'frank'},{name:'joe'}]); // ["frank"]

var bills = [{
    month: 'july',
    casts: [{
        id: 1,
        value: 200
    },{
        id: 2,
        value: 1000
    }]
},
{
    month: 'august',
    casts: [{
        id: 3,
        value: 1000,
    }, {
        id: 4,
        value: 4000
    }]
}];

var result = sift({
    casts: {$elemMatch:{
      value: { $gt: 1000 }
    }}
}, bills); // {month:'august', casts:[{id:2, value: 1000},{id: 4, value: 4000}]}

sift({ $not:{  $in:['craig','tim']}}, ['craig','tim','jake']); //['jake']
sift({ $not:{  $size:5}}, ['craig','tim','jake']); //['tim','jake']

var people = [{
	name: 'craig',
	address: {
		city: 'Minneapolis'
	}
},
{
  	name: 'tim',
	address: {
		city: 'St. Paul'
	}
}];

var sifted: any = sift({  address: { city: 'Minneapolis' }}, people); // count = 1

//or
sifted = sift(<any>{ 'address.city': 'minneapolis' }, people);//count = 1

sift.use({
	$band: function(a, b) {
		return (a & b) ? 0 : -1; // 0 = exists, -1 = doesn't exist
	}
});

var index = sift.indexOf({   }, people); // index = 0