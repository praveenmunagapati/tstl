/// <reference path="../API.ts" />

namespace test
{
	export function test_associatives(): void
	{
		// SET-CONTAINERS
		_Test_unique_set(new std.HashSet<Atomic<number>>());
		_Test_unique_set(new std.TreeSet<Atomic<number>>());
		_Test_multi_set(new std.HashMultiSet<Atomic<number>>());
		_Test_multi_set(new std.TreeMultiSet<Atomic<number>>());

		// MAP-CONTAINERS
		_Test_unique_map(new std.HashMap<Atomic<string>, number>());
		_Test_unique_map(new std.TreeMap<Atomic<string>, number>());
		_Test_multi_map(new std.HashMultiMap<Atomic<string>, number>());
		_Test_multi_map(new std.TreeMultiMap<Atomic<string>, number>());
	}

	/* ---------------------------------------------------------
		SET CONTAINERS
	--------------------------------------------------------- */
	function _Test_unique_set(set: std.base.UniqueSet<Atomic<number>>): void
	{
		// CONSTRUCT ELEMENTS
		_Construct_set(set);

		// DUPLICATED ?
		if (set.size() != 11)
			throw new std.LengthError("Wrong number of elements.");

		let sum: number = 0;
		for (let elem of set)
		{
			// TO VALIDATE
			sum += elem.value;

			// RE-FIND THE ELEMENT BY ITS KEY WITH FIND() FUNCTION.
			let it = set.find(elem);
			if (it.equals(set.end()) == true || it.value.equals(elem) == false)
				throw new std.OutOfRange("Failed to find the element by find() method.");
		}

		// RE-VALIDATE UNIQUENESS & RIGHT INSERTION
		if (sum != 55)
			throw new std.LogicError("Elements are not fully inserted.");
	}

	function _Test_multi_set(set: std.base.MultiSet<Atomic<number>>): void
	{
		// CONSTRUCT ELEMENTS
		_Construct_set(set);

		// DUPLICATED ?
		if (set.size() != 3 * 11)
			throw new std.LengthError("Wrong number of elements.");

		let sum: number = 0;
		for (let elem of set)
		{
			// TO VALIDATE
			sum += elem.value;

			// RE-FIND THE ELEMENT BY ITS KEY WITH FIND() & COUNT() FUNCTION.
			let it = set.find(elem);
			let count = set.count(elem);

			if (it.equals(set.end()) == true || it.value.equals(elem) == false)
				throw new std.OutOfRange("Failed to find the element by find() method.");
			else if (count != 3)
				throw new std.LengthError("Wrong number of duplicated items.");
		}

		// RE-VALIDATE DUPLICATION & RIGHT INSERTION
		if (sum != 3 * 55)
			throw new std.LogicError("Elements are not fully inserted.");
	}

	function _Construct_set(set: std.base.SetContainer<Atomic<number>>): void
	{
		for (let i: number = 0; i <= 10; ++i)
			for (let j: number = 0; j < 3; ++j)
				set.push(new Atomic<number>(i));
	}

	/* ---------------------------------------------------------
		MAP CONTAINERS
	--------------------------------------------------------- */
	function _Test_unique_map(map: std.base.UniqueMap<Atomic<string>, number>): void
	{
		// CONSTRUCT ELEMENTS
		_Construct_map(map);

		// DUPLICATED ?
		if (map.size() != 11)
			throw new std.LengthError("Wrong number of elements.");

		let sum: number = 0;
		for (let pair of map)
		{
			// TO VALIDATE
			sum += pair.second;

			// RE-FIND THE ELEMENT BY ITS KEY WITH FIND() FUNCTION.
			let it = map.find(pair.first);
			if (it.equals(map.end()) == true || it.first.equals(pair.first) == false)
				throw new std.OutOfRange("Failed to find the element by find() method.");
		}

		// RE-VALIDATE UNIQUENESS & RIGHT INSERTION
		if (sum != 55)
			throw new std.LogicError("Elements are not fully inserted.");
	}

	function _Test_multi_map(map: std.base.MultiMap<Atomic<string>, number>): void
	{
		// DUPLICATED ?
		if (map.size() != 3 * 11)
			throw new std.LengthError("Wrong number of elements.");

		let sum: number = 0;
		for (let pair of map)
		{
			// TO VALIDATE
			sum += pair.second;

			// RE-FIND THE ELEMENT BY ITS KEY WITH FIND() & COUNT() FUNCTION.
			let it = map.find(pair.first);
			let count = map.count(pair.first);

			if (it.equals(map.end()) == true || it.first.equals(pair.first) == false)
				throw new std.OutOfRange("Failed to find the element by find() method.");
			else if (count != 3)
				throw new std.LengthError("Wrong number of duplicated items.");
		}

		// RE-VALIDATE UNIQUENESS & RIGHT INSERTION
		if (sum != 3 * 55)
			throw new std.LogicError("Elements are not fully inserted.");
	}

	function _Construct_map(map: std.base.MapContainer<Atomic<string>, number>): void
	{
		for (let i: number = 0; i <= 10; ++i)
			for (let j: number = 0; j < 3; ++j)
			{
				let key = new Atomic<string>(NUMBER_NAMES[i]);
				let value = i;

				map.push(std.make_pair(key, value));
			}
	}

	const NUMBER_NAMES: string[] = 
		[
			"Zero", 
			"First", "Second", "Third", "Fourth", 
			"Fifth", "Sixth", "Seventh", "Eighth", "Nineth", "Tenth"
		];
}
