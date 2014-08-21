package main

import (
	"fmt"
)

type Fizzbuzzer interface {
	next() Fizzbuzzer
	String() string
}

type a1 int

func (i a1) next() Fizzbuzzer {
	return a2(i + 1)
}

func (i a1) String() string {
	return fmt.Sprintf("%d ", i)
}

type a2 int

func (i a2) next() Fizzbuzzer {
	return a3(i + 1)
}
func (i a2) String() string {
	return fmt.Sprintf("%d ", i)
}

type a3 int

func (i a3) next() Fizzbuzzer {
	return b1(i + 1)
}
func (i a3) String() string {
	return "fizz "
}

type b1 int

func (i b1) next() Fizzbuzzer {
	return b2(i + 1)
}
func (i b1) String() string {
	return fmt.Sprintf("%d ", i)
}

type b2 int

func (i b2) next() Fizzbuzzer {
	return c1(i + 1)
}
func (i b2) String() string {
	return "buzz "
}

type c1 int

func (i c1) next() Fizzbuzzer {
	return d1(i + 1)
}
func (i c1) String() string {
	return "fizz "
}

type d1 int

func (i d1) next() Fizzbuzzer {
	return d2(i + 1)
}

func (i d1) String() string {
	return fmt.Sprintf("%d ", i)
}

type d2 int

func (i d2) next() Fizzbuzzer {
	return d3(i + 1)
}
func (i d2) String() string {
	return fmt.Sprintf("%d ", i)
}

type d3 int

func (i d3) next() Fizzbuzzer {
	return e1(i + 1)
}
func (i d3) String() string {
	return "fizz "
}

type e1 int

func (i e1) next() Fizzbuzzer {
	return f1(i + 1)
}
func (i e1) String() string {
	return "buzz "
}

type f1 int

func (i f1) next() Fizzbuzzer {
	return f2(i + 1)
}
func (i f1) String() string {
	return fmt.Sprintf("%d ", i)
}

type f2 int

func (i f2) next() Fizzbuzzer {
	return g1(i + 1)
}
func (i f2) String() string {
	return "fizz "
}

type g1 int

func (i g1) next() Fizzbuzzer {
	return g2(i + 1)
}

func (i g1) String() string {
	return fmt.Sprintf("%d ", i)
}

type g2 int

func (i g2) next() Fizzbuzzer {
	return g3(i + 1)
}
func (i g2) String() string {
	return fmt.Sprintf("%d ", i)
}

type g3 int

func (i g3) next() Fizzbuzzer {
	return a1(i + 1)
}
func (i g3) String() string {
	return "fizzbuzz "
}

func main() {
	lim := 30
	var v Fizzbuzzer
	v = a1(1)

	for i := 1; i <= lim; i++ {
		fmt.Printf(v.String())
		v = v.next()
	}
}
