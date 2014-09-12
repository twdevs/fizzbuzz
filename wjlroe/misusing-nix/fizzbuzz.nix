# Requires Nix installed: http://nixos.org/nix/manual/#idm47361539616144
# How to run: nix-instantiate --eval --strict fizzbuzz.nix

let rangeInternal = x: y: c: if x == y then c ++ [x] else rangeInternal (builtins.add x 1) y (c ++ [x]);
    range = x: y: if builtins.lessThan x y then rangeInternal x y [] else rangeInternal y x [];
    modulo = x: y: builtins.sub x (builtins.mul (builtins.div x y) y);
    fizz = x: modulo x 3 == 0;
    buzz = x: modulo x 5 == 0;
    fizzbuzz = x: fizz x && buzz x;
    fizzBuzzString = x: if fizzbuzz x then "FizzBuzz" else
      if fizz x then "Fizz"
      else if buzz x then "Buzz"
      else x;
in (map fizzBuzzString) (range 1 100)
