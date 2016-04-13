﻿/// <reference path="XTree.ts" />

namespace std.base.tree
{
	/**
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class PairTree<Key, T>
		extends XTree<MapIterator<Key, T>>
	{
		private compare_: (left: Key, right: Key) => boolean;

		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor(compare: (left: Key, right: Key) => boolean = std.less)
		{
			super();

			this.compare_ = compare;
		}

		public find(key: Key): XTreeNode<MapIterator<Key, T>>;

		public find(it: MapIterator<Key, T>): XTreeNode<MapIterator<Key, T>>;

		public find(val: any): XTreeNode<MapIterator<Key, T>>
		{
			if (val instanceof MapIterator && (<MapIterator<Key, T>>val).first instanceof SetIterator == false)
				return super.find(val);
			else
				return this.find_by_key(val);
		}

		private find_by_key(key: Key): XTreeNode<MapIterator<Key, T>>
		{
			if (this.root_ == null)
				return null;

			let node: XTreeNode<MapIterator<Key, T>> = this.root_;

			while (true)
			{
				let newNode: XTreeNode<MapIterator<Key, T>> = null;

				if (std.equals(key, node.value.first))
					break; // EQUALS, MEANS MATCHED, THEN TERMINATE
				else if (std.less(key, node.value.first))
					newNode = node.left; // LESS, THEN TO THE LEFT
				else
					newNode = node.right; // GREATER, THEN TO THE RIGHT

				// ULTIL CHILD NODE EXISTS
				if (newNode == null)
					break;
				
				// SHIFT A NEW NODE TO THE NODE TO BE RETURNED
				node = newNode;
			}

			return node;
		}

		/* ---------------------------------------------------------
			COMPARISON
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public is_equals(left: MapIterator<Key, T>, right: MapIterator<Key, T>): boolean
		{
			return std.equals(left.first, right.first);
		}

		/**
		 * @inheritdoc
		 */
		public is_less(left: MapIterator<Key, T>, right: MapIterator<Key, T>): boolean
		{
			return this.compare_(left.first, right.first);
		}
	}
}